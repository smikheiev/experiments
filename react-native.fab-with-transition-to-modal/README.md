# Idea

Inspired by [this video](https://twitter.com/mironcatalin/status/1801224873408180350) I wanted to recreate a similar fab with transition to modal. The most important parts - it should accept any kind of content and there should be a smooth expand<->collapse transition. It's just a short experiment, so it shouldn't cover all the use cases and corner cases (eg, scrollable content, etc.).

# Results

I didn't recreate it one-to-one, but very close to the original. The transition is smooth and it accepts any kind of content. Also, I added a backdrop that blurs the background (no blur on web and Android), and a gradient as fab/modal background.
I used [moti](https://moti.fyi) for animations as it's very easy to use it and it's a good fit for this use case.

https://github.com/user-attachments/assets/03a0b971-a777-46f6-9b81-3d5eda9e6995

# How to use

1. Install dependencies `npm install`.
2. Start the app `npm start`.
