export const getData = async () => {
	try {
		const res = await fetch('http://localhost:8080/data', {
			method: 'GET',
			headers: {
				accept: 'application/json',
				contentType: 'application/json',
			},
		});
		return await res.json();
	} catch (error) {
		console.log("data can't be fetched", error);
	}
};
