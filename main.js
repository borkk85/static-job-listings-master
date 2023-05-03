const getData = () => {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => displayData(data));
};

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
  let tagArr = [];

  tagBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const header = document.getElementById("header");

      const targetEl = e.target.closest(".tag");
      const tagText = targetEl.textContent.trim();
      const tagId = `selected-tag-${tagText}`;

      tagArr.push(tagText);

      // Check if tag is already in the header bar
      if (document.querySelector(`[data-id="${tagId}"]`)) {
        return;
      }

      const spanEl = document.createElement("span");
      spanEl.classList.add("selected-tag");
      spanEl.setAttribute("data-id", tagId);

      const tagTxt = document.createElement("span");
      tagTxt.classList.add("tag-text");
      tagTxt.textContent = targetEl.textContent;

      const cancelBtn = document.createElement("button");
      cancelBtn.classList.add("cancel");
      cancelBtn.innerHTML = `\&#x2716`;

      spanEl.appendChild(tagTxt);
      spanEl.appendChild(cancelBtn);

      if (!header.querySelector(".selected-bar")) {
        const selectedTag = document.createElement("div");
        selectedTag.classList.add("selected-roles");

        const barEl = document.createElement("div");
        barEl.classList.add("selected-bar");

        const clearBtn = document.createElement("button");
        clearBtn.classList.add("clear");
        clearBtn.textContent = `Clear`;

        header.appendChild(barEl);
        barEl.appendChild(selectedTag);
        barEl.appendChild(clearBtn);

        handleRemoval();
      }
      const selectedTag = header.querySelector(".selected-roles");
      selectedTag.appendChild(spanEl);

      applyFilter();
    });
  });
};

const applyFilter = () => {
  const jobListings = document.querySelectorAll(".job-listing");
  const selectedTags = document.querySelectorAll(".selected-tag");

  jobListings.forEach((listing) => {
    //expand elements of the array into individual elements using the spread operator
    const tags = [...listing.querySelectorAll(".tag")];
    //create a new array with contents of the job listing tags
    const tagsText = tags.map((tag) => tag.textContent.trim());

    let isMatching = true;
    //Check if selected tag exists in the job listings tags
    for (const selectedTag of selectedTags) {
      const tagText = selectedTag.querySelector(".tag-text").textContent.trim();

      if (!tagsText.includes(tagText)) {
        isMatching = false;
        break;
      }
    }

    if (isMatching) {
      listing.style.display = "flex";
    } else {
      listing.style.display = "none";
    }
  });
};

const handleRemoval = () => {
  const parentEl = document.querySelector(".selected-bar");
  const roleEl = document.querySelector(".selected-roles");
  let tagArr = [];
  parentEl.addEventListener("click", (e) => {
    if (e.target.classList.contains("cancel")) {
      const selectedTag = e.target.closest(".selected-tag");
      if (selectedTag) {
        const tagText = selectedTag.textContent.trim();
        tagArr = tagArr.filter((tag) => tag !== tagText);
        selectedTag.remove();
        if (roleEl.children.length === 0) {
          parentEl.remove();
        }
        applyFilter();
      }
    }
    if (e.target.classList.contains("clear")) {
      const selectedTags = document.querySelectorAll(".selected-tag");
      selectedTags.forEach((selectedTag) => {
        const tagText = selectedTag.textContent.trim();
        tagArr = tagArr.filter((tag) => tag !== tagText);

        selectedTag.remove();
        if (roleEl.children.length === 0) {
          parentEl.remove();
        }
        applyFilter();
      });
    }
  });
};

getData();
