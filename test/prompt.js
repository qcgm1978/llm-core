import { Basalt } from "@basalt-ai/sdk";

async function runTest() {
  const key =
    "sk-796e7214098730bf77558583af1741ef0eba43aa39e22ece6a444b023a1bf37c";
  const basalt = new Basalt({ apiKey: key });

  const result = await basalt.dataset.list();
  if (result.error) {
    console.error("Error listing datasets:", result.error);
    return;
  }

  const datasets = result.value;
  console.log("Available datasets:", datasets);
  // Using object syntax
  const { value } = await basalt.prompt.list({
    featureSlug: "onboarding",
  });
  debugger;
}

runTest();
