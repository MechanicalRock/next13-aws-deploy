async function getFormattedDate() {
	const result = await fetch('http://date.jsontest.com/');
	const { milliseconds_since_epoch } = await result.json();
	const renderDate = new Date(milliseconds_since_epoch);
	const formattedDate = new Intl.DateTimeFormat('en-US', {
		dateStyle: 'long',
		timeStyle: 'long',
	}).format(renderDate);
	console.log(
		`SSR ran on ${formattedDate}. This will be logged in CloudWatch.`
	);
	return formattedDate;
}

export default async function SSR() {
	const formattedDate = await getFormattedDate();

	return (
		<>
			<h1>Server-side rendered page</h1>
			<p>
				This page is server-side rendered. It was rendered on {formattedDate}.
			</p>
			<p>
				<a href="/">View a static page.</a>
			</p>
		</>
	);
}
