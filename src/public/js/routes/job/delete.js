const axios = require("axios");
const Swal = require("sweetalert2");

/**
 * Delete a job
 */
function onDeleteJob(event) {
	event.preventDefault();
	
	const id = event.target.dataset.delete;
	if(id) {
		// Delete via axios
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
			cancelButtonText: "Don't delete",
		}).then(async (result) => {
			if (result.isConfirmed) {
				// Create axios instance
				const instance = axios.create({
					baseURL: `${location.origin}`,
					headers: {
						// "Authorization": `Bearer ${localStorage.getItem("token")}`,
						"Content-Type": "application/json"
					}
				});
				
				// Delete job
				const response = await instance.delete(`/job/delete/${id}`);
				
				const status = response.status;
				
				// Get message info
				const data = response.data;
				const firstMessage = data.messages[0];
				const message = firstMessage.message;
				if(status === 200) {
					Swal.fire({
						title: "Deleted!",
						text: "The job post has been deleted.",
						icon: "success"
					});
					
					// Delete element
					const jobListing = event.target.parentElement.parentElement.parentElement;
					const jobPost = event.target.parentElement.parentElement;
					
					jobListing.removeChild(jobPost);
				} else {
					Swal.fire({
						title: "Error",
						text: `The job post couldn't be delete. Reason: ${message}`,
						icon: "success"
					});
				}
			}
		});
	} else {
		window.location.href = event.target.href;
	}
}

document.addEventListener("DOMContentLoaded", () => {
	const jobListing = document.querySelector(".panel-administracion");
	if(!jobListing) {
		console.error(`Couldn't find the job listing`);
		return;
	}
	
	jobListing.addEventListener("click", onDeleteJob);
});
