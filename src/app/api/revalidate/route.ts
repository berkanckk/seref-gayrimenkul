import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{
      _type: string;
      slug?: { current: string };
    }>(req, process.env.SANITY_REVALIDATE_SECRET);

    if (!isValidSignature) {
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 401 }
      );
    }

    if (!body?._type) {
      return NextResponse.json(
        { message: "Bad request - no type" },
        { status: 400 }
      );
    }

    // Revalidate based on document type
    switch (body._type) {
      case "property":
        revalidateTag("property", { expire: 0 });
        revalidateTag("properties", { expire: 0 });
        if (body.slug?.current) {
          revalidateTag(`property:${body.slug.current}`, { expire: 0 });
        }
        break;
      case "siteSettings":
        revalidateTag("siteSettings", { expire: 0 });
        break;
      case "aboutPage":
        revalidateTag("aboutPage", { expire: 0 });
        break;
      case "contactPage":
        revalidateTag("contactPage", { expire: 0 });
        break;
      default:
        // Revalidate all for safety
        revalidateTag("property", { expire: 0 });
        revalidateTag("siteSettings", { expire: 0 });
        revalidateTag("aboutPage", { expire: 0 });
        revalidateTag("contactPage", { expire: 0 });
    }

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}
