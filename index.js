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
    currentIndex = (currentIndex + 1) % images.length;
    imgElement.src = images[currentIndex];
  }
  setInterval(switchImage, 500);

  // Pulse animation on intro link
  const introLink = document.getElementById('intro-link');
  const pulseImage = document.getElementById('pulse-image');

  if (introLink && pulseImage) {
    introLink.addEventListener('click', function () {
      pulseImage.classList.add('pulse');
      pulseImage.addEventListener('animationend', function () {
        pulseImage.classList.remove('pulse');
      }, { once: true });
    });
  }

  // ==================== ENHANCED PROJECT CAROUSEL ====================
  
  let currentProject = 0;
  const projects = document.querySelectorAll('#projects-wrapper .project');
  const totalProjects = projects.length;
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  let autoRotateInterval;

  // Only initialize if projects exist
  if (totalProjects > 0 && prevBtn && nextBtn) {
    
    // Create indicator dots
    const projectsContainer = document.getElementById('projects-container');
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

    // Function to show specific project
    function showProject(index) {
      // Remove active class from all projects and indicators
      projects.forEach(project => {
        project.classList.remove('active');
      });
      
      const dots = document.querySelectorAll('.indicator-dot');
      dots.forEach(dot => {
        dot.classList.remove('active');
      });

      // Add active class to current project and indicator
      projects[index].classList.add('active');
      if (dots[index]) {
        dots[index].classList.add('active');
      }

      // Update button states
      updateButtonStates();
    }

    // Function to go to specific project
    function goToProject(index) {
      if (index >= 0 && index < totalProjects) {
        currentProject = index;
        showProject(currentProject);
        resetAutoRotate();
      }
    }

    // Function to go to next project
    function nextProject() {
      currentProject = (currentProject + 1) % totalProjects;
      showProject(currentProject);
    }

    // Function to go to previous project
    function prevProject() {
      currentProject = (currentProject - 1 + totalProjects) % totalProjects;
      showProject(currentProject);
    }

    // Update button disabled states
    function updateButtonStates() {
      // For looping carousel, we don't disable buttons
      prevBtn.disabled = false;
      nextBtn.disabled = false;
    }

    // Reset auto-rotate timer
    function resetAutoRotate() {
      clearInterval(autoRotateInterval);
      autoRotateInterval = setInterval(nextProject, 4000);
    }

    // Event listeners for navigation buttons
    nextBtn.addEventListener('click', function() {
      nextProject();
      resetAutoRotate();
    });

    prevBtn.addEventListener('click', function() {
      prevProject();
      resetAutoRotate();
    });

    // Keyboard navigation (only when not typing in input fields)
    document.addEventListener('keydown', function(e) {
      // Don't trigger if user is typing in an input or textarea
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      if (e.key === 'ArrowRight') {
        nextProject();
        resetAutoRotate();
      } else if (e.key === 'ArrowLeft') {
        prevProject();
        resetAutoRotate();
      }
    });

    // Pause auto-rotate on hover
    projectsContainer.addEventListener('mouseenter', function() {
      clearInterval(autoRotateInterval);
    });

    projectsContainer.addEventListener('mouseleave', function() {
      resetAutoRotate();
    });

    // Initialize - show first project and start auto-rotate
    showProject(currentProject);
    updateButtonStates();
    autoRotateInterval = setInterval(nextProject, 4000);
  }
});