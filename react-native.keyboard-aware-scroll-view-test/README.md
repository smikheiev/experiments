```
cd react-native.keyboard-aware-scroll-view-test
yarn ios
```

# Idea

I wanted to test how to make the UI form on iOS behave "nicely" with the keyboard (make the inputs scroll up if they're covered by the keyboard). On Android it works out-of-the-box.

This is the example UI:

<img src="https://user-images.githubusercontent.com/4534154/110390371-90430000-806e-11eb-82e1-d64bdf0c9d3b.png" width="250" />

- the list of the inputs is scrollable
- the "Submit" button is aligned to the bottom of the screen.

The desired behaviour is:

- the inputs that are covered by the keyboard (eg, "City", "Address") move up together with the keyboard
- the submit button moves up together with the keyboard

# Result

- Using `KeyboardAwareScrollView` from `react-native-keyboard-aware-scroll-view` package makes inputs to scroll up if they're covered by the keyboard (though there is too much space on the bottom, maybe caused by having the button on the button and/of `SaveAreaView`), but it's not moving the button (which is kinda obvious, as it's not a part of the scroll view):

  <img src="https://user-images.githubusercontent.com/4534154/110393070-9f2bb180-8072-11eb-8188-81379b692afe.gif" width="250" />

- Using `KeyboardAvoidingView` makes the button move together with the keyboard. But it looks like `KeyboardAwareScrollView` does not work with `KeyboardAvoidingView` - there is a huge free space on the bottom when scrolling the inputs up (changing `behavior` value does not help):

  <img src="https://user-images.githubusercontent.com/4534154/110393242-dd28d580-8072-11eb-905d-a30672f6d7d0.gif" width="250" />

- Removing `KeyboardAwareScrollView` solves the issue:

  <img src="https://user-images.githubusercontent.com/4534154/110393293-f16cd280-8072-11eb-9662-e9da326ddfd6.gif" width="250" />

  So basically, `KeyboardAwareScrollView` is not needed at all, as `KeyboardAvoidingView` can do both - move inputs and move the button.

- But it sounds too good to be true... And there is a fly in the ointment - it doesn't work with multiline inputs ("City" in the current example):

  <img src="https://user-images.githubusercontent.com/4534154/110393333-06e1fc80-8073-11eb-89cc-843438897448.gif" width="250" />

  It's a known issue from November 2017 (now it's March 2020): https://github.com/facebook/react-native/issues/16826.

- One of the workarounds is to set `scrollEnabled` to `false` for the multiline input. Then it works pretty well:

  <img src="https://user-images.githubusercontent.com/4534154/110393370-17927280-8073-11eb-8ddb-75ef05ff326a.gif" width="250" />

## To summarize

`KeyboardAvoidingView` is giving us the desired behaviour, but it has a few nasty bugs (eg, the one mentioned above, or this one https://github.com/facebook/react-native/issues/29499).
