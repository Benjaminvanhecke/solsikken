// ===== Solsikken — Scriptable Home Screen widget =====
// A new optimistic line about friendship & colour every day. 🌻
//
// SETUP (one time):
//  1. Install the free app "Scriptable" from the App Store.
//  2. Open Scriptable, tap + (new script), paste ALL of this in, name it "Solsikken".
//  3. Long-press your Home Screen, tap + , search "Scriptable", add a widget
//     (medium size looks best).
//  4. Tap-hold the new widget, choose "Edit Widget", set Script = Solsikken.
//  Done. It refreshes itself; a fresh leaf appears each day.
//
// OPTIONAL: paste your hosted link below to make tapping the widget open the
// full bouquet (where you can pull/collect leaves). Leave "" to do nothing.
const OPEN_URL = "";           // e.g. "https://benjaminvanhecke.github.io/solsikken/"
const SHOW_ENGLISH = false;    // true = show the English line instead of Norwegian

const MESSAGES_NO = [
  "Noen vennskap er fargen himmelen får rett før den overrasker deg.",
  "Du gjør verden litt mer gul, helt uten å prøve.",
  "En venn er noen som maler dagen din i farger du ikke visste fantes.",
  "Selv grå dager har en kant av gull når man deler dem med noen.",
  "Vennskap vokser som solsikker: sakte, mot lyset, og høyere enn du tror.",
  "I dag finnes det en farge der ute som bare venter på å gjøre deg glad.",
  "Du er noens favorittfarge i en verden full av valg.",
  "Latter mellom venner er den varmeste gulfargen som finnes.",
  "Selv den minste hilsen kan farge en hel dag.",
  "Du trenger ikke være sola for noen; iblant holder det å være den lille gule blomsten som snur seg mot den.",
  "Det finnes mennesker som gjør hjertet ditt litt mer fargerikt bare ved å være til.",
  "Vennskap er å dele paletten sin med hverandre.",
  "I morgen har allerede en farge den gleder seg til å vise deg.",
  "Du sprer mer lys enn du aner.",
  "Noen ganger er det de små, gule øyeblikkene som bærer hele dagen.",
  "En ekte venn ser fargene dine, også på dagene du føler deg grå.",
  "Det vakreste med farger er at de blir sterkere side om side, akkurat som venner.",
  "Du er verdt en hel eng av solsikker.",
  "Hold ut: de fineste fargene kommer ofte sist på himmelen.",
  "Vennskap trenger ikke mange ord; av og til holder en gul blomst.",
  "Hver dag er et tomt lerret, og du har alltid hatt godt fargevalg.",
  "Den som tenker på deg i dag, gjør verden litt rundere og varmere.",
  "Selv om det regner, finnes fargene fortsatt, de venter bare på lyset.",
  "Du er en av grunnene til at noen smiler i dag.",
  "Vennskap er solskinn man kan ta med seg innendørs.",
  "Noen blomster snur seg mot sola; du får andre til å gjøre det samme.",
  "La dagen få farge på deg: du fortjener alle de fine nyansene.",
  "De beste vennene maler litt gult inn i de grå stundene dine.",
  "Det finnes mer godhet rundt deg enn du rekker å se på én dag.",
  "Et vennskap er en farge som ikke falmer.",
  "Du tar med deg lys inn i rom uten å vite det selv.",
  "Slik solsikker alltid finner lyset, finner gode mennesker alltid hverandre.",
  "I dag er en god dag for å være litt snill mot deg selv.",
  "Den minste vennligheten kan farge en hel uke.",
  "Du er noens trygge, gule sted.",
  "Selv på vindfulle dager står solsikkene sammen.",
  "Verden er litt mer fargerik fordi du er i den.",
  "Noen tenker varmt på deg akkurat nå.",
  "Pass på lyset ditt: det er fint, og noen styrer etter det."
];

const MESSAGES_EN = [
  "Some friendships are the colour the sky turns right before it surprises you.",
  "You make the world a little more yellow, without even trying.",
  "A friend is someone who paints your day in colours you didn't know existed.",
  "Even grey days have an edge of gold when you share them with someone.",
  "Friendship grows like sunflowers: slowly, toward the light, and taller than you think.",
  "Today there's a colour out there just waiting to make you happy.",
  "You are someone's favourite colour in a world full of choices.",
  "Laughter between friends is the warmest shade of yellow there is.",
  "Even the smallest hello can colour a whole day.",
  "You don't have to be the sun for anyone; sometimes it's enough to be the little yellow flower that turns toward it.",
  "There are people who make your heart a little more colourful simply by existing.",
  "Friendship is sharing your palette with one another.",
  "Tomorrow already has a colour it's looking forward to showing you.",
  "You spread more light than you realise.",
  "Sometimes it's the small, yellow moments that carry the whole day.",
  "A true friend sees your colours, even on the days you feel grey.",
  "The loveliest thing about colours is that they grow stronger side by side, just like friends.",
  "You are worth a whole meadow of sunflowers.",
  "Hang in there: the finest colours often come last in the sky.",
  "Friendship doesn't need many words; sometimes a yellow flower is enough.",
  "Every day is a blank canvas, and you've always had a good eye for colour.",
  "Whoever is thinking of you today makes the world a little rounder and warmer.",
  "Even when it rains, the colours are still there, they're just waiting for the light.",
  "You're one of the reasons someone is smiling today.",
  "Friendship is sunshine you can take indoors with you.",
  "Some flowers turn toward the sun; you make others do the same.",
  "Let the day put some colour on you: you deserve all the lovely shades.",
  "The best friends paint a little yellow into your grey moments.",
  "There's more kindness around you than you can take in within a single day.",
  "A friendship is a colour that doesn't fade.",
  "You bring light into rooms without even knowing it.",
  "Just as sunflowers always find the light, good people always find each other.",
  "Today is a good day to be a little kind to yourself.",
  "The smallest kindness can colour a whole week.",
  "You are someone's safe, yellow place.",
  "Even on windy days, the sunflowers stand together.",
  "The world is a little more colourful because you're in it.",
  "Someone is thinking warmly of you right now.",
  "Take care of your light: it's lovely, and someone steers by it."
];

const MESSAGES = SHOW_ENGLISH ? MESSAGES_EN : MESSAGES_NO;

// Pick a line by the day number so it changes once per day and cycles all 40.
const now = new Date();
const dayNumber = Math.floor(
  Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000
);
const message = MESSAGES[dayNumber % MESSAGES.length];

// Warm hue that drifts day to day, matching the web bouquet palette.
const HUES = [45, 18, 200, 280, 150, 332, 28, 175, 95, 260, 8, 215];
const hue = HUES[dayNumber % HUES.length];

function build() {
  const w = new ListWidget();
  const g = new LinearGradient();
  g.locations = [0, 1];
  g.colors = [new Color("#fff7e0"), new Color("#ffe3c7")];
  g.startPoint = new Point(0, 0);
  g.endPoint = new Point(1, 1);
  w.backgroundGradient = g;
  w.setPadding(16, 18, 16, 18);

  const fam = config.widgetFamily || "medium";
  const big = fam === "large";

  const flower = w.addText("🌻");
  flower.font = Font.systemFont(big ? 46 : 34);
  flower.centerAlignText();

  w.addSpacing(big ? 10 : 6);

  const t = w.addText(message);
  t.font = Font.semiboldRoundedSystemFont(fam === "small" ? 11 : big ? 19 : 14);
  t.textColor = new Color(hsl(hue, 0.55, 0.26));
  t.centerAlignText();
  t.minimumScaleFactor = 0.7;

  if (OPEN_URL) w.url = OPEN_URL;
  return w;
}

// tiny HSL -> hex helper (Scriptable's Color wants hex/rgb)
function hsl(h, s, l) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  const to = (v) => Math.round((v + m) * 255).toString(16).padStart(2, "0");
  return "#" + to(r) + to(g) + to(b);
}

const widget = build();
if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  await widget.presentMedium();
}
Script.complete();
