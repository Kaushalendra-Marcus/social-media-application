import { createRouteHandler } from "uploadthing/next-legacy";
import { ourFileRouter } from "./core";

// Create the handler
const handler = createRouteHandler({
  router: ourFileRouter,
  // Optional config
});

// Export it with the correct HTTP method
export { handler as POST };
