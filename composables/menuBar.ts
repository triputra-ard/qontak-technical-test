export default function () {
  const uiStore = uiData();
  const toggleMenu = () => {
    uiStore.menuBar.show = !uiStore.menuBar.show;
  };

  return {
    toggleMenu,
  };
}
