# itmayziii portfolio-ui
Personal portfolio of [Tommy May III](https://www.fullheapdeveloper.com)

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
