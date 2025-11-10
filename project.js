// $(document).ready(function () {
//   let currentIndex = 0;
//   const projects = $('.project');
//   const totalProjects = projects.length;

//   function showProject(index) {
//     projects.removeClass('active');
//     projects.eq(index).addClass('active');
//   }

//   $('#nextBtn').click(function () {
//     currentIndex = (currentIndex + 1) % totalProjects;
//     showProject(currentIndex);
//   });

//   $('#prevBtn').click(function () {
//     currentIndex = (currentIndex - 1 + totalProjects) % totalProjects;
//     showProject(currentIndex);
//   });

//   function rotateImages() {
//     const activeProject = projects.eq(currentIndex);
//     const images = activeProject.find('.project-image');
//     let imgIndex = 0;

//     function showNextImage() {
//       images.removeClass('active');
//       images.eq(imgIndex).addClass('active');
//       imgIndex = (imgIndex + 1) % images.length;
//     }

//     showNextImage();
//     setInterval(showNextImage, 7000);
//   }

//   rotateImages();
// });
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  let currentProject = 0;
  const projects = document.querySelectorAll('.project');
  const totalProjects = projects.length;
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  let imageRotationIntervals = [];

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

  // Function to rotate images within a project
  function startImageRotation(projectElement) {
    const images = projectElement.querySelectorAll('.project-image');
    if (images.length <= 1) return; // No rotation needed for single image

    let imgIndex = 0;
    images[0].style.display = 'block';

    const interval = setInterval(() => {
      // Hide all images
      images.forEach(img => img.style.display = 'none');
      
      // Show next image
      imgIndex = (imgIndex + 1) % images.length;
      images[imgIndex].style.display = 'block';
    }, 7000); // Rotate every 7 seconds

    return interval;
  }

  // Function to stop all image rotations
  function stopAllImageRotations() {
    imageRotationIntervals.forEach(interval => clearInterval(interval));
    imageRotationIntervals = [];
  }

  // Function to show specific project
  function showProject(index) {
    // Stop all image rotations
    stopAllImageRotations();

    // Remove active class from all projects and indicators
    projects.forEach(project => {
      project.classList.remove('active');
      // Reset all images to hidden
      const images = project.querySelectorAll('.project-image');
      images.forEach(img => img.style.display = 'none');
    });
    
    const dots = document.querySelectorAll('.indicator-dot');
    dots.forEach(dot => {
      dot.classList.remove('active');
    });

    // Add active class to current project and indicator
    projects[index].classList.add('active');
    dots[index].classList.add('active');

    // Start image rotation for current project
    const rotationInterval = startImageRotation(projects[index]);
    if (rotationInterval) {
      imageRotationIntervals.push(rotationInterval);
    }

    // Update button states
    updateButtonStates();
  }

  // Function to go to specific project
  function goToProject(index) {
    if (index >= 0 && index < totalProjects) {
      currentProject = index;
      showProject(currentProject);
    }
  }

  // Function to go to next project
  function nextProject() {
    if (currentProject < totalProjects - 1) {
      currentProject++;
      showProject(currentProject);
    }
  }

  // Function to go to previous project
  function prevProject() {
    if (currentProject > 0) {
      currentProject--;
      showProject(currentProject);
    }
  }

  // Update button disabled states
  function updateButtonStates() {
    prevBtn.disabled = (currentProject === 0);
    nextBtn.disabled = (currentProject === totalProjects - 1);
  }

  // Event listeners for navigation buttons
  nextBtn.addEventListener('click', nextProject);
  prevBtn.addEventListener('click', prevProject);

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight') {
      nextProject();
    } else if (e.key === 'ArrowLeft') {
      prevProject();
    }
  });

  // Initialize - show first project
  showProject(currentProject);
  updateButtonStates();

  // Clean up intervals when page is closed
  window.addEventListener('beforeunload', stopAllImageRotations);
});