const fs = require("fs");
var child_process = require("child_process");
var {
    Octoveal
} = require("./octoveal");
var builds = {};
const express = require('express');
var forgefile = require("./forgefile");
var version_parser = require("./version_parser");

const app = express();
app.use(express.json());
app.use(require("express-all-allow")());

if (!fs.existsSync("projects")) fs.mkdirSync("projects");

app.get('/', (req, res) => {
    res.send('Hello Express app!')
});

app.post("/api/new_automation", function(req, res) {
    var octoveal = new Octoveal({
        auth: req.body.auth,
        repo: req.body.repo.split("/").pop(),
        owner: req.body.repo.split("/").shift()
    });
    console.log(req.body.repo.split("/").pop());
    child_process.spawnSync("cd projects && git clone git://github.com/" + req.body.repo + ".git", {
        shell: true,
        stdio: "inherit"
    });
    var parsed = forgefile.parse("projects/" + req.body.repo.split("/").pop() + "/Forgefile");
    parsed.build_commands.forEach(async function(c, i) {
        console.log("CURRENT COMMAND: cd projects/" + req.body.repo.split("/").pop() + " && " + c)
        child_process.spawnSync("cd projects/" + req.body.repo.split("/").pop() + " && " + c, {
            shell: true,
            stdio: "inherit"
        });
    });

	var rnum = Math.random().toString().split(".").pop();
            builds[rnum] = async function() {
				 var parsed = forgefile.parse("projects/" + req.body.repo.split("/").pop() + "/Forgefile");
    parsed.build_commands.forEach(async function(c, i) {
        console.log("CURRENT COMMAND: cd projects/" + req.body.repo.split("/").pop() + " && " + c)
        child_process.spawnSync("cd projects/" + req.body.repo.split("/").pop() + " && " + c, {
            shell: true,
            stdio: "inherit"
        });
    });
                var current_release = await octoveal.getLatestRelease();
                current_release = current_release.data.tag_name;
                var parsed_ver = version_parser.parse_array(current_release);
                parsed_ver[parsed_ver.length - 1] = parsed_ver[parsed_ver.length - 1] + 1;
                var new_ver = "v" + parsed_ver.join(".");
                console.log(new_ver);
                await octoveal.createRelease(new_ver);
                setTimeout(function() {
                    console.log(parsed.exports);
                    parsed.exports.forEach(async function(_export, index) {
						console.log(_export, parsed.exports);
                        if (!_export == "") {
                            var dir = "projects/" + req.body.repo.split("/").pop() + "/" + _export;
                            await octoveal.addAssetToRelease(new_ver, dir);

                        }
                    })
                }, 2500)
            };
            // end build script
			if (req.body.build_now) {
            builds[rnum]();
			}
    setInterval(builds[rnum], req.body.time);
})

app.listen(process.env.PORT || 3000, () => {
    setInterval(function(){
    require("http").get("http://forgebin.herokuapp.com");
    }, 300000)
});
