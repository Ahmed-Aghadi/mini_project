mergeInto(LibraryManager.library, {
  SignIn: function () {
    window.dispatchReactUnityEvent("SignIn");
  },
  GetDesigns: function () {
    window.dispatchReactUnityEvent("GetDesigns");
  },
  SaveDesign: function (design) {
    window.dispatchReactUnityEvent("SaveDesign", UTF8ToString(design));
  },
  GetENS: function (address) {
    window.dispatchReactUnityEvent("GetENS", UTF8ToString(address));
  },
});