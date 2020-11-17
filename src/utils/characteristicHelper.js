// To get the translation of the name of characteristic
export const getCharacteristicTranslationName = (characteristic) => {
  switch (characteristic.name) {
    case "focus":
      return "Confiance";
    case "haste":
      return "Hâte";
    case "intelligence":
      return "Intelligence";
    case "strength":
      return "Force";
    case "experience":
      return "Expérience";
    case "health":
      return "Vie";
    default:
      return characteristic.name;
  }
}