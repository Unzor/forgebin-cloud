module.exports = {parse: function(filename) {
var rangethrough = function(sequence, str) {
    var a2 = [];
    str.split(sequence[0]).forEach(function(e) {
        var h = e.split(sequence[1]);
        if (h.length == 1) {
            h = h[0];
        }
        a2.push(h)
    })
    var a3 = [];
    a2.forEach(function(e) {
        var type = typeof e;
        if (type == "object") {
            a3.push(sequence[0] + e[0] + sequence[1]);
            a3.push(e[1]);
        } else {
            a3.push(e);
        }
    })
    return a3;
}
var tokenized = rangethrough(["{", "}"], require("fs").readFileSync(filename).toString())
var parsed = {};
tokenized.forEach(function(e, i){
var task = e.endsWith(": ") ? e.slice(0, -1) : null;
var tasks = {};
if (task) {
task = task.slice(0, -1)
if (task.startsWith(";\n")) {
task = task.slice(2)
}
//tasks[task] = 
var Build = tokenized[i - 1];
var Exports = tokenized[i + 1]
if (Build !== undefined) {
Exports = Exports.slice(2).slice(0, -2);
Build = Build.slice(2).slice(0, -2);
var bcommands = [];
var export_files = [];
Build.split("\n").forEach(function(e, i){
bcommands.push(e);
})
Exports.split("\n").forEach(function(e, i){
export_files.push(e);
})
parsed.exports = export_files.slice(1);
parsed.build_commands = bcommands.slice(1);
}
}
})
return parsed;
}}
