import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { getUserSession } from '@/lib/session';
import { getSingleClass } from '@/lib/actions/classActions';
import { checkBookingStatus } from '@/lib/actions/bookingActions';

export async function POST(request) {
    try {
        const headersList = await headers();
        const origin = headersList.get('origin');

        const user = await getUserSession();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized! Please login first." }, { status: 401 });
        }

        const body = await request.json();
        const { classId, className, price, image } = body;

        if (!classId || !price || !className) {
            return NextResponse.json({ error: "Missing required class information" }, { status: 400 });
        }

        const classResponse = await getSingleClass(classId);
        if (!classResponse || !classResponse.data) {
            return NextResponse.json({ error: "Requested class not found" }, { status: 404 });
        }

        const targetClass = classResponse.data;

        if (user.role === "trainer" && targetClass.trainerEmail === user.email) {
            return NextResponse.json({ error: "You cannot purchase your own class!" }, { status: 403 });
        }

        if (user.role === "trainer" || user.role === "admin") {
            return NextResponse.json({ error: "Only users can purchase classes" }, { status: 403 });
        }

        const alreadyBooked = await checkBookingStatus(classId, user.email);
        if (alreadyBooked && alreadyBooked.booked) {
            return NextResponse.json({ error: "You have already enrolled in this class!" }, { status: 400 });
        }

        const session = await stripe.checkout.sessions.create({
            customer_email: user?.email,
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: className,
                            images: image ? [image] : [],
                            description: `Enrollment for ${className}`,
                        },
                        unit_amount: Math.round(Number(price) * 100),
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                classId: classId,
                userId: user?.id,
                userEmail: user?.email
            },
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}&classId=${classId}&email=${encodeURIComponent(user?.email)}&price=${price}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/classes/${classId}`,
        });

        return NextResponse.json({ url: session.url });

    } catch (err) {
        console.error("Stripe Error:", err);
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        );
    }
}