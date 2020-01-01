# itmayziii portfolio-ui
Personal portfolio of [Tommy May III](https://www.fullheapdeveloper.com)

## Development
This project is built with [GatsbyJS](https://www.gatsbyjs.org/).

### Useful Commands
* Start dev server - `npm run start`
* Lint - `npm run lint:fix`
* Test - `npm run test`

### Linting
Linting is handled by ESLint and a [StandardJS/Typescript plugin](https://www.npmjs.com/package/eslint-plugin-standard-typescript).

### Typescript
Typescript is used in this project and is setup according to [the docs](https://www.gatsbyjs.org/packages/gatsby-plugin-typescript/).

### CSS
[Tailwind CSS](https://tailwindcss.com/) is the CSS framework being used. Tailwind is a utility first CSS library and the [config can be found here](tailwind.config.js).
We are attempting to use the utility classes everywhere we can, and when a CSS class need extracted out then we aim to use [Tailwind's @apply directive](https://tailwindcss.com/docs/functions-and-directives/#apply).
Tailwind is being ran through [PostCSS](https://www.gatsbyjs.org/docs/post-css/) and the [config can be found here](postcss.config.js).

#### Keeping CSS Footprint Small
Utility frameworks generally have a large CSS footprint in terms of file size initially. We are countering this with a PostCSS plugins called
[PurgeCSS](https://www.purgecss.com/) which removes CSS not being used in the code. PurgeCSS does have some [caveats](https://tailwindcss.com/docs/controlling-file-size/#writing-purgeable-html)
though that you should watch out for. We are also only running PurgeCSS in production and not development for faster dev build times so be sure
to make sure your actual production build works as expected.

## Deployment
Docker is being used for [dev/prod parity](https://12factor.net/dev-prod-parity).

The deployment flow is:
1. [Create a new Git tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging) from the master branch and push that tag to Github `git push --folow-tags`.
2. [Cloud build](#cloud-build-cihttpscloudgooglecomcloud-build) will pickup this new tag and create a Docker image based on the [Dockerfile](Dockerfile).
3. Once cloud build is finished we are relying on [GCP Instance Groups](https://cloud.google.com/compute/docs/instance-groups/) to host our
Nginx Docker container. In order to update a instance group we must update the template the instance group is using, [instructions are here](https://cloud.google.com/compute/docs/containers/deploying-containers#updating_a_managed_instance_group_running_a_container).

**Note** _Not currently relying on kubernetes as it is overkill on pricing with only needing this Nginx container._

## Infrastructure Notes
Some of these notes involve the use of the [gsutil CLI](https://cloud.google.com/storage/docs/gsutil) which you need to download.

### Images and Other Assets
Images are stored in [Cloud Storage](https://cloud.google.com/storage/) mostly because images often need added/updated without changing
any code. There is a [public bucket setup](https://console.cloud.google.com/storage/browser/itmayziii-portfolio) where these assets are added.

**Note** _The [Load Balancer](#load-balancinghttpscloudgooglecomload-balancing)_ has a URL map for `/images/*` to this storage bucket. 

### [Load Balancing](https://cloud.google.com/load-balancing/)
The Google HTTPS load balancer is setup similar to [this article](https://cloud.google.com/compute/docs/instance-groups/adding-an-instance-group-to-a-load-balancer)
with a URL map for anything at `fullheapdeveloper.com/*` and `www.fullheapdeveloper.com/*` to the backend instance group. Load balancing
SSL/TSL certificates are being managed by Google.

### [DNS](https://cloud.google.com/dns/)
DNS is managed through [Cloud DNS](https://cloud.google.com/dns/docs/quickstart). Simply configured to have an A record that points to `fullheapdeveloper.com`
and a CNAME record that aliases `www.fullheapdeveloper.com` -> `fullheapdeveloper.com`.

### [Cloud Build (CI)](https://cloud.google.com/cloud-build/)
There are 2 cloud build configuration files.
1. [cloudbuild.yaml](cloudbuild.yaml) - Verifies every pull request by running the linter and tests.
2. [cloudbuild-build.yaml](cloudbuild-build.yaml) - Builds the project, creates the docker image, and pushes the image to the container registry. 
This is setup to fire on a new Git tag being created and pushed to Github.
