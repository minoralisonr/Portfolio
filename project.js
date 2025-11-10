$(document).ready(function () {
  let currentIndex = 0;
  const projects = $('.project');
  const totalProjects = projects.length;

  function showProject(index) {
    projects.removeClass('active');
    projects.eq(index).addClass('active');
  }

  $('#nextBtn').click(function () {
    currentIndex = (currentIndex + 1) % totalProjects;
    showProject(currentIndex);
  });

  $('#prevBtn').click(function () {
    currentIndex = (currentIndex - 1 + totalProjects) % totalProjects;
    showProject(currentIndex);
  });

  function rotateImages() {
    const activeProject = projects.eq(currentIndex);
    const images = activeProject.find('.project-image');
    let imgIndex = 0;

    function showNextImage() {
      images.removeClass('active');
      images.eq(imgIndex).addClass('active');
      imgIndex = (imgIndex + 1) % images.length;
    }

    showNextImage();
    setInterval(showNextImage, 7000);
  }

  rotateImages();
});