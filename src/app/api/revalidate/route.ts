import { revalidatePath, revalidateTag } from "next/cache";
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

    const type = body._type;

    // Revalidate tags AND paths for full cache invalidation
    // Note: next/cache revalidateTag requires second profile argument in Next.js 16+
    switch (type) {
      case "property":
        revalidateTag("property", { expire: 0 });
        revalidateTag("properties", { expire: 0 });
        revalidatePath("/", "layout");
        revalidatePath("/ilanlar", "page");
        if (body.slug?.current) {
          revalidateTag(`property:${body.slug.current}`, { expire: 0 });
          revalidatePath(`/ilanlar/${body.slug.current}`, "page");
        }
        break;

      case "siteSettings":
        revalidateTag("siteSettings", { expire: 0 });
        // Site settings affects every page (header, footer)
        revalidatePath("/", "layout");
        break;

      case "aboutPage":
        revalidateTag("aboutPage", { expire: 0 });
        revalidatePath("/hakkimizda", "page");
        break;

      case "contactPage":
        revalidateTag("contactPage", { expire: 0 });
        revalidatePath("/iletisim", "page");
        break;

      default:
        // Revalidate everything as safety net
        revalidateTag("property", { expire: 0 });
        revalidateTag("properties", { expire: 0 });
        revalidateTag("siteSettings", { expire: 0 });
        revalidateTag("aboutPage", { expire: 0 });
        revalidateTag("contactPage", { expire: 0 });
        revalidatePath("/", "layout");
    }

    return NextResponse.json({
      status: 200,
      revalidated: true,
      type,
      now: Date.now(),
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Revalidation error:", errorMessage);
    return NextResponse.json(
      { message: errorMessage },
      { status: 500 }
    );
  }
}
