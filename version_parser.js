var versionParser = {};
versionParser.parse = function(tag){
var res;
var split_tag;
if (tag.startsWith("v")) {
split_tag = tag.slice(1).split(".");
} else {
split_tag = tag.split(".");
}
if (split_tag.length == 3) {
res = {major: parseInt(split_tag[0]), minor: parseInt(split_tag[1]), patch: parseInt(split_tag[2])};
} else if (split_tag.length == 2) {
res = {major: parseInt(split_tag[0]), minor: parseInt(split_tag[1])};
}  else if (split_tag.length == 1) {
res = {major: parseInt(split_tag[0])};
}
return res;
};
versionParser.parse_array = function(tag){
	var res;
	var p_array = [];
var split_tag;
if (tag.startsWith("v")) {
split_tag = tag.slice(1).split(".");
} else {
split_tag = tag.split(".");
}
if (split_tag.length == 3) {
res = {major: parseInt(split_tag[0]), minor: parseInt(split_tag[1]), patch: parseInt(split_tag[2])};
p_array.push(res.major);
p_array.push(res.minor);
p_array.push(res.patch);
} else if (split_tag.length == 2) {
res = {major: parseInt(split_tag[0]), minor: parseInt(split_tag[1])};
p_array.push(res.major);
p_array.push(res.minor);
}  else if (split_tag.length == 1) {
res = {major: parseInt(split_tag[0])};
p_array.push(res.major);
}

return p_array;
}
module.exports = versionParser;