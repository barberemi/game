// To get the color of the rarity of object
export const getColorItem = (item) => {
  switch (item.rarity) {
    case "unusual":
      return "#1eff00";
    case "rare":
      return "#00BFFF";
    case "epic":
      return "#c600ff";
    case "legendary":
      return "#ff8000";
    default: // common
      return "#ffffff";
  }
}