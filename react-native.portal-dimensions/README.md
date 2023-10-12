```
cd react-native.portal-dimensions
yarn ios
```

# Idea

I was working with portals in a project and had an issue that portal's height wasn't changing when elements were added to it. So I wanted to test if it's portal's issue or something wrong with components I was using.

What I needed to do:
- there is a scroll list with some content
- there's a portal host on the button of the screen, inside a container with absolute positioning
- when there are some element added to the portal, the scroll list should adjst to portal's height - so it should always be possible to scroll until the bottom of the content no matter how big the portal is.

# Result

It looks like portal's height is changing normally when elements are added to it:

https://github.com/smikheiev/experiments/assets/4534154/de740cdb-8597-413d-a6c3-4f2abe7d9890

So the problem is with components I was using in the project. Which is good, as I can find and fix the issue!