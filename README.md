# Growth Bridge Advisory website

A responsive, static company website prepared for GitHub Pages and `growthbridgeadvisory.com`.

## Included
- Responsive single-page corporate website
- Company logo extracted from the supplied company profile
- Services and delivery approach based on the supplied profile
- Contact form that opens the visitor's email application (no backend or data storage)
- `CNAME` file for `growthbridgeadvisory.com`
- SEO title, description and social metadata

## Publish to GitHub Pages
1. Create a new GitHub repository, for example `growthbridge-advisory-website`.
2. Upload the **contents** of this folder (not the enclosing folder) to the repository's root.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then Save.
5. The repository already includes a `CNAME` file for `growthbridgeadvisory.com`.
6. In **Settings → Pages → Custom domain**, enter `growthbridgeadvisory.com` if it is not already populated, and save.
7. After DNS has propagated and GitHub has issued the certificate, enable **Enforce HTTPS**.

## GoDaddy DNS records
In GoDaddy → Domain Portfolio → `growthbridgeadvisory.com` → DNS, configure:

| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | YOUR-GITHUB-USERNAME.github.io |

Replace `YOUR-GITHUB-USERNAME` with the GitHub account or organization that owns the Pages site. Do not add the repository name to the CNAME target. Remove conflicting old `A` records for `@` and conflicting `CNAME` records for `www`. Keep MX records and other email-related DNS records intact.

DNS changes can take up to 24 hours. GitHub recommends configuring the custom domain in repository settings and verifying ownership before DNS configuration. See:
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-your-custom-domain-for-github-pages
- https://www.godaddy.com/en-in/help/add-an-a-record-19238
- https://www.godaddy.com/en/help/add-a-cname-record-19236

## Important content notes before launch
- Confirm the public contact email address. The current site uses `ritusingh@growthbridgeadvisory.com`, based on the email supplied with the request.
- No phone number, office address, named team biographies, client logos, testimonials or case studies were present in the source profile, so none have been invented.
- The AI-enabled HR & Process Automation section is explicitly labelled as a development roadmap, consistent with the supplied company profile.
- The contact form uses `mailto:` and therefore requires the visitor to have an email application configured. For a server-backed form, connect a form service or backend before launch.

## Local preview
Open `index.html` in a browser. No build step or package installation is required.
