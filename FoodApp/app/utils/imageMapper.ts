export const getImage = (name: string) => {
  switch (name) {
    case "TraSua.png":
      return require("../../assets/images/TraSua.png");
    case "Pizza.png":
      return require("../../assets/images/Pizza.png");
    case "Burger.png":
      return require("../../assets/images/Burger.png");
    case "Sushi.png":
      return require("../../assets/images/Sushi.png");
    case "Salad.png":
      return require("../../assets/images/Salad.png");
    default:
      return require("../../assets/images/TraSua.png"); // fallback
  }
};
