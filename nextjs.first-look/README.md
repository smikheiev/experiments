# Idea

I wanted to try Next.js, in particular:
- how easy it is to set it up and start using
- how easy it is to deploy it to Firebase (I chose Firebase because I'm familiar with it and didn't want to learn any new service atm)

# Results

## Set up and usage

It was very easy to set up the Next.js project and start using it. I used the official documentation and built a simple blog site.
There's a lot of articles and tutorials in internet, the community is pretty big.
Also, there's a lot of official examples of how to use Next.js with different tools/libs/etc (eg, with Apollo GraphQL client).

I wasn't very happy with the default eslint rules, but it also was pretty easy to add a custom configuration for it.

Also, I tried a bit Tailwind CSS, which also looks like a pretty interesting tool to use.

## Deployment

First, I deployed the site with the Next.js server to Firebase hosting and functions. This way, it's possible to use server-side rendering with serverless Firebase function.

Then, I removed the server completely, and deployed just a static site to Firebase hosting (this require running `yarn export` to export static site).

# How to use

```
cd nextjs.first-look
yarn
```

To start local environment:
```
yarn dev
```
and go to http://localhost:3000

To deploy (_this probably won't work, as the firebase project has already beed removed from the Google Cloud_):
```
yarn deploy
```
