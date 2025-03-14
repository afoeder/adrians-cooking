# My Recipes

Through the years I have collected some recipes either passed down from relatives or researched and adjusted for my taste or what I've considered authentic.

In an attempt to store them as well as possible, this is it.

Start with the [index](docs/index.md).

## Writing

To run, according to the [Material for MkDocs Getting Started Guide](https://squidfunk.github.io/mkdocs-material/getting-started/):

- For the latest source, installed locally:
   1. create a venv and fetch the latest MkDocs-Material:
      ```bash
      python3 -m venv venv/
      source venv/bin/activate
      git submodule add https://github.com/squidfunk/mkdocs-material.git
      pip install -e mkdocs-material
      ```
   2. For [Preview as you write](https://squidfunk.github.io/mkdocs-material/creating-your-site/#previewing-as-you-write):
      ```bash
      mkdocs serve
      ```
- With docker:
  1. ```bash
     docker pull
     ```
  2. ```bash
     docker run --rm -it -p 8000:8000 -v ${PWD}:/docs squidfunk/mkdocs-material
     ```

## Download icon(s)

The [mkdocs.yml](mkdocs.yml) references icon tags. We need these to be available from twemoji/openmoji, copied locally. Since we only want the files that are actually used, they are copy-pasted here for now. We could improve this with a script that takes the necessary icon sources directly from the .yml.

Note that Twemoji uses lowercase hex names, OpenMoji uppercase, so they are adjusted.

```bash
declare -a arr=("1F603" "1f923" "1F372" "1F990" "1f1f2-1f1fd" "1f32e" "1f1ea-1f1f8" "1f958" "1f1e9-1f1ea" "1f1e8-1f1ed" "1f1e8-1f1f3" "1f35a" "1f1fa-1f1f8" "1f1e8-1f1fa" "1f1ee-1f1f9")
for hex in "${arr[@]}"
do
  hexUppercase=$(echo "$hex" | tr '[:lower:]' '[:upper:]')
  hexLowercase=$(echo "$hex" | tr '[:upper:]' '[:lower:]')
  cd overrides/.icons/openmoji/color && { curl -O https://openmoji.org/data/color/svg/$hexUppercase.svg ; cd -; }
  cd overrides/.icons/openmoji/black && { curl -O https://openmoji.org/data/black/svg/$hexUppercase.svg ; cd -; }
  cd overrides/.icons/twemoji && { curl -O "https://raw.githubusercontent.com/twitter/twemoji/refs/heads/master/assets/svg/$hexLowercase.svg" ; cd -; }
done
```

## Publishing

The site is published on Cloudflare via "[Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-an-mkdocs-site/#deploy-with-cloudflare-pages)".

There is no Github workflow / action since the repository is wired with Cloudflare behind the curtains. When a push occurs, Cf gets notified and starts the build. The Domain names also point to Cf. GitHub pages therefore is not involved.
At the time of writing there is no reason for this.
