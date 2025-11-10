document.addEventListener("DOMContentLoaded", function () {
  // Logo image rotation
  const images = [
    'images/mino1.png',
    'images/mino2.png',
    'images/mino3.png',
    'images/mino4.png',
    'images/mino7.png',
    'images/mino8.png',
    'images/mino5.png',
    'images/mino6.png'
  ];
  const imgElement = document.getElementById('logo-image');
  let currentIndex = 0;

  function switchImage() {
    currentIndex = (currentIndex + 1) % images.length;
    imgElement.src = images[currentIndex];
  }
  setInterval(switchImage, 500);

  // Pulse animation on intro link
  const introLink = document.getElementById('intro-link');
  const pulseImage = document.getElementById('pulse-image');

  introLink.addEventListener('click', function () {
    pulseImage.classList.add('pulse');
    pulseImage.addEventListener('animationend', function () {
      pulseImage.classList.remove('pulse');
    }, { once: true });
  });

  // Project carousel
  const projects = document.querySelectorAll('#projects-wrapper .project');
  let projectIndex = 0;

  function showProject(index) {
    projects.forEach((project, i) => {
      project.classList.toggle('active', i === index);
      project.style.opacity = i === index ? 1 : 0;
    });
  }

  function nextProject() {
    projectIndex = (projectIndex + 1) % projects.length;
    showProject(projectIndex);
  }

  function prevProject() {
    projectIndex = (projectIndex - 1 + projects.length) % projects.length;
    showProject(projectIndex);
  }

  document.getElementById('nextBtn').addEventListener('click', nextProject);
  document.getElementById('prevBtn').addEventListener('click', prevProject);

  showProject(projectIndex);
  setInterval(nextProject, 4000);
});