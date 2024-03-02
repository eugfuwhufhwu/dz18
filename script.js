const list = document.querySelector('.goals')
const getBtn = document.querySelector('.get')
const postBtn = document.querySelector('.post')
const patchBtn = document.querySelector('.patch')
const deleteBtn = document.querySelector('.delete')

const getData = url => {
	return new Promise((resolve, reject) =>
		fetch(url)
			.then(response => response.json())
			.then(json => resolve(json))
			.catch(error => reject(error))
	)
}
const postData = (url, goal) => {
	return new Promise((resolve, reject) =>
		fetch(url, {
			method: 'POST',
			body: JSON.stringify(goal),
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		})
			.then(response => response.json())
			.then(json => resolve(json))
			.catch(error => reject(error))
	)
}

const patchData = (url, goal) => {
	return new Promise((resolve, reject) =>
		fetch(url, {
			method: 'PATCH',
			body: JSON.stringify(goal),
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		})
			.then(response => response.json())
			.then(json => resolve(json))
			.catch(error => reject(error))
	)
}

const delData = url => {
	return new Promise((resolve, reject) =>
		fetch(url, { method: 'DELETE' })
			.then(response => response.json())
			.then(json => resolve(json))
			.catch(error => reject(error))
	)
}

getBtn.addEventListener('click', async e => {
	e.preventDefault()
	try {
		const goals = await getData('http://localhost:3000/PRODUCTS')
		goals.forEach(goal => {
			list.insertAdjacentHTML(
				`beforeend`,
				`
			<li class="productItem">
					<div class="block-color" style="background: ${goal.color}"></div>
					<div class="text-info">
						<p class="title">${goal.title}</p>
						<p class="price">${goal.text}</p>
					</div>
				</li>
			`
			)
		})
	} catch (error) {
		console.log(error)
	}
})

postBtn.addEventListener('click', async e => {
	e.preventDefault()
	let title = prompt('введите название')
	let text = prompt('введите описание')
	let color = prompt('введите цвет')
	try {
		await postData('http://localhost:3000/PRODUCTS', {
			id: title.trim(''),
			title,
			text,
			color
		}).then(response => {
			console.log(response, 'данные успешно добавлены')
		})
	} catch (error) {
		console.error(error)
	}
})

// изменить продукт
patchBtn.addEventListener('click', async e => {
	e.preventDefault()
	let id = prompt('введите id')
	let title = prompt('введите название')
	let text = prompt('описание')
	let color = prompt('введите цвет')
	try {
		await patchData(`http://localhost:3000/PRODUCTS/${id}`, {
			title,
			text,
			color
		}).then(response => {
			console.log(response, 'данные успешно обновлены')
		})
	} catch (error) {
		console.error(error, 'не получилось обновить данные')
	}
})

deleteBtn.addEventListener('click', async e => {
	e.preventDefault()
	const id = prompt('введите id')
	try {
		delData(`http://localhost:3000/PRODUCTS/${id}`).then(response => {
			console.log(response, `продукт с id = ${id} успешно удалён`)
		})
	} catch (err) {
		console.error(err, 'ошибка при удалении')
	}
})
