import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { getUserSession } from '@/lib/session';

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
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}&classId=${body.classId}&email=${body.userEmail}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/classes/${body.classId}`,
        });

        return NextResponse.json({ url: session.url });

    } catch (err) {
        console.error("Stripe Error:", err);
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}