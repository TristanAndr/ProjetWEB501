const jobs = [
  {title: "Développeur Frontend", company: "TechCorp", type: "CDI", location: "Paris"},
  {title: "Assistant Marketing", company: "MarketPlus", type: "CDD", location: "Lyon"},
  {title: "Stage Data Analyst", company: "DataSolutions", type: "Stage", location: "Remote"},
  {title: "Développeur Backend", company: "WebDevCo", type: "CDI", location: "Marseille"},
  {title: "Community Manager", company: "SocialBuzz", type: "CDD", location: "Paris"}
];

const jobsContainer = document.getElementById('jobs-container');
const filterSelect = document.getElementById('filter');

function displayJobs(jobsList) {
  jobsContainer.innerHTML = "";
  if(jobsList.length === 0){
    jobsContainer.innerHTML = "<p>Aucune annonce trouvée.</p>";
    return;
  }
  jobsList.forEach(job => {
    const jobCard = document.createElement('div');
    jobCard.classList.add('job-card');
    jobCard.innerHTML = `
      <h3>${job.title}</h3>
      <p><strong>Entreprise:</strong> ${job.company}</p>
      <p><strong>Type de contrat:</strong> ${job.type}</p>
      <p><strong>Lieu:</strong> ${job.location}</p>
    `;
    jobsContainer.appendChild(jobCard);
  });
}

filterSelect.addEventListener('change', () => {
  const selected = filterSelect.value;
  if(selected === "all"){
    displayJobs(jobs);
  } else {
    displayJobs(jobs.filter(job => job.type === selected));
  }
});

// Afficher toutes les annonces au chargement
displayJobs(jobs);
