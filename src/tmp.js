var array = [
		{ key_set1: { int_val: 3, arr_val: [1, 3, 4] } },
		{ key_set2: { string_val: "foo" } },
	],
	object = {};

array.forEach(function (a) {
	var key = Object.keys(a)[0];
	object[key] = a[key];
});

console.log(object);
