const getData = () => {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => displayData(data));
};

getData();

const displayData = (data) => {
  const mainContainer = document.querySelector(".container");

  data.forEach((listing) => {
    const body = `
        <div class="job-listing ${listing.featured ? "featured-listing" : ""}">
        <div class="logo"><img src="${listing.logo}" alt=""></div>
        <div class="company-container">
          <div class="company-details">
            <span class="company-name">${listing.company}</span>
            <span class="new ${listing.new ? `newish` : ``}">${
      listing.new ? `NEW!` : ``
    } </span>
            <span class="featured ${listing.featured ? `featuredish` : ``}">${
      listing.featured ? `FEATURED` : ``
    }</span>
          </div>
          <div class="emplyee-role">
            <span class="role">${listing.position} </span>
          </div>
          <div class="details">
            <span class="created">${listing.postedAt}</span> \u2022
            <span class="contract">${listing.contract}</span> \u2022
            <span class="location">${listing.location}</span>
          </div>
        </div>
        <div class="tags">
          <span class="tag">${listing.role}</span>
          <span class="tag">${listing.level}</span>
          ${listing.languages
            .map(
              (language) => `
          <span class="tag">${language}</span>
          `
            )
            .join("")}
          ${listing.tools
            .map(
              (tool) => `
          <span class="tag">${tool}</span>
          `
            )
            .join("")}
        </div>
      </div>
        `;

    mainContainer.innerHTML += body;
  });

  clickHandler();
};

const clickHandler = () => {
  const tagBtns = document.querySelectorAll(".tag");

  tagBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const selectedTag = document.querySelector(".selected-roles");
      const targetEl = e.target.closest(".tag");
      const tagText = targetEl.textContent.trim();
      const tagId = `selected-tag-${tagText}`;

      // Check if the tag is already in the header bar
      if (document.querySelector(`[data-id="${tagId}"]`)) {
        return; // Do not add the tag again
      }

      const spanEl = document.createElement("span");
      spanEl.classList.add("selected-tag");
      spanEl.setAttribute("data-id", tagId);

      const tagTxt = document.createElement('span')
      tagTxt.classList.add('tag-text')
      tagTxt.textContent = targetEl.textContent

      const cancelBtn = document.createElement("button");
      cancelBtn.classList.add("cancel");

      cancelBtn.innerHTML = `\&#x2716`;

      spanEl.appendChild(tagTxt);
      spanEl.appendChild(cancelBtn)
      selectedTag.appendChild(spanEl);
    });
  });

  handleRemoval();
};

const handleRemoval = () => {
  const parentEl = document.querySelector(".selected-bar");

  parentEl.addEventListener("click", (e) => {
    if (e.target.classList.contains("cancel")) {
      const selectedTag = e.target.closest(".selected-tag");
      if (selectedTag) {
        selectedTag.remove();
      }
    }
    if (e.target.classList.contains("clear")) {
      const selectedTags = document.querySelectorAll(".selected-tag");
      selectedTags.forEach((selectedTag) => {
        selectedTag.remove();
      });
    }
  });
};
