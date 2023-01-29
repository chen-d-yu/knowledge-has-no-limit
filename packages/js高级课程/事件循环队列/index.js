async function async1() {
	console.log("A")
	await async2()
	console.log("B")
}

async function async2() {
	console.log("C")
}

console.log("D")

setTimeout(() => {
	console.log("E")
}, 0)

async1()

new Promise((resolve) => {
	console.log("F")

	resolve()
}).then(res => {
	console.log("G")
})

console.log("H")