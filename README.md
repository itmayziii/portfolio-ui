# itmayziii portfolio-ui
Personal portfolio of [Tommy May III](https://www.fullheapdeveloper.com)

## Deployments
This static site is being stored in [Google Cloud Storage](https://cloud.google.com/storage/) at [this bucket](https://console.cloud.google.com/storage/browser/itmayziii-portfolio?project=itmayziii).
Bucket content is being served through a [Google HTTPS load balancer](https://cloud.google.com/load-balancing/docs/https/) with
[Cloud CDN](https://cloud.google.com/cdn/) enabled. Deploying to this bucket only involves [creating a git tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging)
and our CI tool [Google Cloud Build](https://cloud.google.com/cloud-build/) will deploy the static files. If you are interested in seeing the
commands that Google Cloud Build is running then check out the [configuration file](cloudbuild-build.yaml).

A lot of information can be found [here](https://cloud.google.com/storage/docs/hosting-static-website) for hosting static sites with Google
Cloud Storage. However the difference is we are using a load balancer in front of the storage bucket.

## Infrastructure Notes
Some of these notes involve the use of the [gsutil CLI](https://cloud.google.com/storage/docs/gsutil) which you need to download.

### [Cloud Storage](https://cloud.google.com/storage/)
Cloud storage needs to be configured to handle index.html files as Gatsby stores directories with index.html files in them. We also need to configure
the default 404 page when a file does not exist.
Run `gsutil web set -m index.html -e not-found.html gs://itmayziii-portfolio`

### [Load Balancing](https://cloud.google.com/load-balancing/)
The Google HTTPS load balancer is setup similar to [this article](https://cloud.google.com/load-balancing/docs/https/adding-backend-buckets-to-load-balancers)
with a URL map for anything at `fullheapdeveloper.com/*` and `www.fullheapdeveloper.com/*` to the backend bucket. Load balancing SSL/TSL certificates
are being managed by Google.

### [DNS](https://cloud.google.com/dns/)
DNS is managed through [Cloud DNS](https://cloud.google.com/dns/docs/quickstart). Simply configured to have an A record that points to `fullheapdeveloper.com`
and a CNAME record that aliases `www.fullheapdeveloper.com` -> `fullheapdeveloper.com`.

### [Cloud Build (CI)](https://cloud.google.com/cloud-build/)
[Config file](cloudbuild.yaml) - 
