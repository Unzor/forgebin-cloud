const fs = require("fs");
const { Octokit, App } = require("octokit");
class Octoveal {
  constructor(settings) {
    this.auth = settings.auth;
    this.repo = settings.repo;
    this.owner = settings.owner;
    global.octokit = new Octokit({auth: this.auth});
  }
  async addAssetToRelease(tag, file){
     var release = await octokit.rest.repos
      .getReleaseByTag({
        owner: this.owner,
        repo: this.repo,
        tag: tag,
      });
release = release.data.upload_url
    console.log(file, release);
	var filtered_file = file.split("\\")[file.split("\\").length - 1].split("/")[file.split("/").length - 1];
      await octokit.request({
          method: "POST",
          url: release,
          headers: {
            "content-type": "text/plain",
          },
          data: fs.readFileSync(file).toString(),
          name: filtered_file,
          label: filtered_file,
        });
  }
async createRelease(tag) {
  return await octokit.request(`POST /repos/${this.owner}/${this.repo}/releases`, {
  owner: this.owner,
  repo: this.repo,
  tag_name: tag
});
  }
  async getLatestRelease(){
    return await octokit.request(`GET /repos/${this.owner}/${this.repo}/releases/latest`, {
  owner: this.owner,
  repo: this.repo
})
  }
}
module.exports = {Octoveal: Octoveal}