document.addEventListener("DOMContentLoaded", function () {
  // ==================== ORIGINAL FUNCTIONALITY ====================

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
    if (imgElement) {
      currentIndex = (currentIndex + 1) % images.length;
      imgElement.src = images[currentIndex];
    }
  }
  setInterval(switchImage, 500);

  // Pulse animation on intro link
  const introLink = document.getElementById('intro-link');
  const pulseImage = document.getElementById('pulse-image');

  if (introLink && pulseImage) {
    introLink.addEventListener('click', function () {
      pulseImage.classList.add('pulse');
    });

    pulseImage.addEventListener('animationend', function () {
      pulseImage.classList.remove('pulse');
    });
  }

  // ==================== ENHANCED PROJECT CAROUSEL ====================

  let currentProject = 0;
  const projects = document.querySelectorAll('#projects-wrapper .project');
  const totalProjects = projects.length;
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const projectsContainer = document.getElementById('projects-container');
  let autoRotateInterval;

  if (totalProjects > 0 && prevBtn && nextBtn && projectsContainer) {
    // Create indicator dots
    const indicatorsDiv = document.createElement('div');
    indicatorsDiv.className = 'project-indicators';

    for (let i = 0; i < totalProjects; i++) {
      const dot = document.createElement('span');
      dot.className = 'indicator-dot';
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToProject(i));
      indicatorsDiv.appendChild(dot);
    }

    projectsContainer.appendChild(indicatorsDiv);

    function showProject(index) {
      projects.forEach(project => project.classList.remove('active'));
      const dots = document.querySelectorAll('.indicator-dot');
      dots.forEach(dot => dot.classList.remove('active'));

      projects[index].classList.add('active');
      if (dots[index]) dots[index].classList.add('active');

      updateButtonStates();
    }

    function goToProject(index) {
      if (index >= 0 && index < totalProjects) {
        currentProject = index;
        showProject(currentProject);
        resetAutoRotate();
      }
    }

    function nextProject() {
      currentProject = (currentProject + 1) % totalProjects;
      showProject(currentProject);
    }

    function prevProject() {
      currentProject = (currentProject - 1 + totalProjects) % totalProjects;
      showProject(currentProject);
    }

    function updateButtonStates() {
      prevBtn.disabled = false;
      nextBtn.disabled = false;
    }

    function resetAutoRotate() {
      clearInterval(autoRotateInterval);
      autoRotateInterval = setInterval(nextProject, 4000);
    }

    nextBtn.addEventListener('click', () => {
      nextProject();
      resetAutoRotate();
    });

    prevBtn.addEventListener('click', () => {
      prevProject();
      resetAutoRotate();
    });

    document.addEventListener('keydown', function (e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowRight') {
        nextProject();
        resetAutoRotate();
      } else if (e.key === 'ArrowLeft') {
        prevProject();
        resetAutoRotate();
      }
    });

    projectsContainer.addEventListener('mouseenter', () => {
      clearInterval(autoRotateInterval);
    });

    projectsContainer.addEventListener('mouseleave', () => {
      resetAutoRotate();
    });

    showProject(currentProject);
    updateButtonStates();
    autoRotateInterval = setInterval(nextProject, 4000);
  }
});