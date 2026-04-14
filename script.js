const projects = [
  {
    title: "반응형 랜딩 페이지",
    description: "제품 소개와 CTA를 깔끔하게 보여주는 반응형 웹페이지 개발.",
    tags: ["HTML", "CSS", "JavaScript"],
    url: "https://example.com/project-landing"
  },
  {
    title: "작업 관리 앱",
    description: "할 일 추가, 수정, 삭제 기능이 있는 간단한 TODO 앱 제작.",
    tags: ["JavaScript", "Web Storage", "UI"],
    url: "https://example.com/project-todo"
  },
  {
    title: "포트폴리오 갤러리",
    description: "이미지 갤러리와 프로젝트 상세 정보를 포함한 UI 구성.",
    tags: ["HTML", "CSS Grid", "Responsive"],
    url: "https://example.com/project-gallery"
  },
  {
    title: "블로그 플랫폼 디자인",
    description: "모바일과 데스크톱 모두 대응하는 블로그 레이아웃 제작.",
    tags: ["CSS", "Layout", "UX"],
    url: "https://example.com/project-blog"
  }
];

const projectGrid = document.getElementById("project-grid");

function createProjectCard(project) {
  const card = document.createElement("article");
  card.className = "project-card";

  const title = document.createElement("h3");
  title.textContent = project.title;

  const description = document.createElement("p");
  description.textContent = project.description;

  const tagList = document.createElement("ul");
  tagList.className = "tag-list";
  project.tags.forEach(tag => {
    const item = document.createElement("li");
    item.textContent = tag;
    tagList.appendChild(item);
  });

  const link = document.createElement("a");
  link.className = "project-link";
  link.href = project.url;
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = "자세히 보기";

  card.append(title, description, tagList, link);
  return card;
}

function renderProjects() {
  if (!projectGrid) {
    console.warn("Project grid container not found.");
    return;
  }

  projects.forEach(project => {
    const card = createProjectCard(project);
    projectGrid.appendChild(card);
  });
}

function setupSmoothScroll() {
  const navLinks = document.querySelectorAll(".nav a");
  const nav = document.querySelector(".nav");
  navLinks.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      if (nav && nav.classList.contains("active")) {
        nav.classList.remove("active");
      }
    });
  });
}

function setupMenuToggle() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  toggle.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}

function initPandaMotion() {
  const panda = document.querySelector(".hero-panda");
  const section = document.querySelector(".hero-section");
  if (!panda || !section) {
    return;
  }

  const speed = 0.24;
  let x = 40;
  let y = 130;
  let dx = Math.cos(Math.random() * Math.PI * 2) * speed;
  let dy = Math.sin(Math.random() * Math.PI * 2) * speed;

  function bounce(axis) {
    const speedMag = Math.hypot(dx, dy) || speed;
    if (axis === "x") {
      dx = -dx;
      dy = (Math.random() * 2 - 1) * speed;
    } else {
      dy = -dy;
      dx = (Math.random() * 2 - 1) * speed;
    }
    const norm = Math.hypot(dx, dy) || 1;
    dx = (dx / norm) * speedMag;
    dy = (dy / norm) * speedMag;
  }

  function animate(time) {
    const sectionRect = section.getBoundingClientRect();
    const pandaWidth = panda.offsetWidth;
    const pandaHeight = panda.offsetHeight;
    const minX = -pandaWidth * 0.2;
    const maxX = sectionRect.width - pandaWidth * 0.8;
    const minY = -pandaHeight * 0.2;
    const maxY = sectionRect.height - pandaHeight * 0.5;

    x += dx * 16;
    y += dy * 16;

    if (x < minX) {
      x = minX;
      bounce("x");
    } else if (x > maxX) {
      x = maxX;
      bounce("x");
    }

    if (y < minY) {
      y = minY;
      bounce("y");
    } else if (y > maxY) {
      y = maxY;
      bounce("y");
    }

    panda.style.left = `${x}px`;
    panda.style.top = `${y}px`;
    panda.style.transform = `scaleX(${dx < 0 ? -1 : 1})`;
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

renderProjects();
setupSmoothScroll();
setupMenuToggle();
initPandaMotion();
