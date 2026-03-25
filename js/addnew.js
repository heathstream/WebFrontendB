"use strict";
import { musicGroupService } from "./api-service.js";

const _service = new musicGroupService("https://music.api.public.seido.se/api");

// Sidans element:
const form = document.querySelector("form");
const submitStatusText = document.querySelector("#submitStatusText");

// Event handlers:
form.addEventListener("submit", e => submitHandler(e))

populateGenreOptions();
populateYearOptions();

async function submitHandler(e) {
    e.preventDefault();

    if (!form.checkValidity()) {
        e.stopPropagation();
    }
    else {
        const name = new String(document.querySelector("input[id='name']").value);
        const genre = new String(document.querySelector("select[id='genre']").value);
        const year = new Number(document.querySelector("select[id='year']").value);

        
        
        const newMusicGroup = {
            "musicGroupId": null,
            "name": name,
            "strGenre": genre,
            "albums": [],
            "artists": [],
            "establishedYear": year,
        }

        let submittedGroup = _service.createMusicGroupAsync(newMusicGroup);
        if (submittedGroup) {
            submitStatusText.classList.add("submitSuccess");
            submitStatusText.innerText = "Successfully submitted!"
        }
        else {
            submitStatusText.classList.add("submitFail");
            submitStatusText.innerText = "Failed to submit."
        }
    }
}

function populateGenreOptions() {
    
    const select = document.querySelector("#genre");
    const genres = [
        "Rock",
        "Metal",
        "Alternative",
        "Jazz",
        "Classical",
        "Kids",
        "Country",
        "Folk",
        "R&B",
        "Hiphop"
    ]
    
    for (const genre of genres) {
        const option = select.appendChild(document.createElement("option"));
        option.value = genre;
        option.innerText = genre;
    }
}

function populateYearOptions() {

    const select = document.querySelector("#year");
    const currentYear = new Date().getFullYear();

    for (let i = currentYear; i >= 1900; i--) {
        const option = select.appendChild(document.createElement("option"));
        option.value = i;
        option.innerText = i.toString();
    }
}
