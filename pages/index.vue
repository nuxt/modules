<template>
  <div class="pb-16">
    <div class="bg-forest-night pt-16 pb-16 sm:pb-24">
      <div class="pb-10 text-center px-4 sm:px-6 lg:px-8">
        <div class="flex justify-center">
          <svg class="w-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 298">
            <g fill="none" fill-rule="nonzero">
              <path fill="#00C58E" d="M227.92099 82.07407l-13.6889 23.7037-46.8148-81.08641L23.7037 273.58025h97.3037c0 13.0912 10.61252 23.7037 23.70371 23.7037H23.70371c-8.46771 0-16.29145-4.52017-20.5246-11.85382-4.23315-7.33366-4.23272-16.36849.00114-23.70174L146.89383 12.83951c4.23415-7.33433 12.0596-11.85252 20.5284-11.85252 8.46878 0 16.29423 4.51819 20.52839 11.85252l39.97037 69.23456z"/>
              <path fill="#FFF" d="M331.6642 261.7284l-90.05432-155.95062-13.6889-23.7037-13.68888 23.7037-90.04445 155.95061c-4.23385 7.33325-4.23428 16.36808-.00113 23.70174 4.23314 7.33365 12.05689 11.85382 20.5246 11.85382h166.4c8.46946 0 16.29644-4.51525 20.532-11.84955 4.23555-7.3343 4.23606-16.37123.00132-23.706h.01976zM144.7111 273.58024L227.921 129.48148l83.19012 144.09877h-166.4z"/>
              <path fill="#108775" d="M396.04938 285.4321c-4.23344 7.33254-12.05656 11.85185-20.52345 11.85185H311.1111c13.0912 0 23.7037-10.6125 23.7037-23.7037h40.66173L260.09877 73.74815l-18.4889 32.02963-13.68888-23.7037L239.5753 61.8963c4.23416-7.33433 12.0596-11.85252 20.5284-11.85252 8.46879 0 16.29423 4.51819 20.52839 11.85252l115.41728 199.8321c4.23426 7.33395 4.23426 16.36975 0 23.7037z"/>
            </g>
          </svg>
        </div>
        <h1 class="mt-4 text-4xl leading-10 font-extrabold text-white sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl">Explore Nuxt Modules</h1>
        <p class="max-w-xl mt-5 mx-auto text-lg sm:text-xl leading-7 text-rainy-grey">Discover our list of modules to supercharge your <a href="https://nuxtjs.org" class="border-b border-stone-green hover:text-green-500 hover:border-green-600">Nuxt project</a>. Created by the Nuxt team and community.</p>
        <div class="max-w-xl mt-2 mx-auto text-center">
          <a href="https://github.com/nuxt/modules" role="noopener" target="_blan" class="text-md leading-4 items-center space-x-1 text-grey-light border-b border-stone-green hover:text-green-500 hover:border-green-600">
            Contribute on GitHub
          </a>
        </div>
      </div>
    </div>
    <div class="relative -mt-16 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <dl class="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
          <div class="flex justify-center sm:flex-col border-b border-gray-100 p-4 sm:p-6 text-center sm:border-0 sm:border-r">
            <dt class="order-2 sm:mt-2 ml-2 sm:ml-0 sm:text-md leading-6 font-medium text-gray-500 sm:capitalize" id="item-1">
              modules
            </dt>
            <dd class="order-1 text-2xl sm:text-4xl leading-none font-extrabold text-green-600" aria-describedby="item-1">
              {{ modules.length }}
            </dd>
          </div>
          <div class="flex justify-center sm:flex-col border-t border-b border-gray-100 p-4 sm:p-6 text-center sm:border-0 sm:border-l sm:border-r">
            <dt class="order-2 sm:mt-2 ml-2 sm:ml-0 sm:text-md leading-6 font-medium text-gray-500 sm:capitalize">
              downloads last 30 days
            </dt>
            <dd class="order-1 text-2xl sm:text-4xl leading-none font-extrabold text-green-600">
              {{ numberFormat(downloads) }}
            </dd>
          </div>
          <div class="flex justify-center sm:flex-col border-t border-gray-100 p-4 sm:p-6 text-center sm:border-0 sm:border-l">
            <dt class="order-2 sm:mt-2 ml-2 sm:ml-0 sm:text-md leading-6 font-medium text-gray-500 sm:capitalize">
              maintainers
            </dt>
            <dd class="order-1 text-2xl sm:text-4xl leading-none font-extrabold text-green-600">
              {{ maintainersTotal }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
    <div class="pt-12 pb-8 container mx-auto px-4 sm:px-0">
      <div class="sm:max-w-lg sm:mx-auto flex border border-rainy-grey rounded-md overflow-hidden shadow-sm">
        <input v-model="q" v-focus aria-label="Search" class="flex-1 appearance-none block p-3 text-base leading-6 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 transition duration-150 ease-in-out sm:flex-1" placeholder="Search a module (name, category, username, etc.)">
        <button class="px-6 py-3 bg-rainy-grey hover:bg-grey-light text-gray-700 text-base leading-6 font-medium shadow-sm focus:outline-none transition duration-150 ease-in-out sm:mt-0 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </button>
      </div>
      <div class="flex sm:flex-wrap space-x-2 sm:justify-center pt-6 overflow-x-auto">
        <button v-for="category of categories" :key="category" @click="toggleCategory(category)" class="px-4 py-2 text-sm rounded focus:outline-none mb-2 cursor-pointer" :class="[ selectedCategory === category ? 'bg-forest-night text-white' : 'text-forest-night bg-rainy-grey hover:bg-grey-light']">{{ category }}</button>
      </div>
    </div>
    <div class="container mx-auto px-4 sm:px-0">
      <p class="mb-4 text-stone-green">{{ filteredModules.length }} module{{ filteredModules.length !== 1 ? 's' : '' }} found</p>
      <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        <div v-for="module of filteredModules" :key="module.name" class="relative flex flex-col bg-white shadow rounded-md overflow-hidden hover:shadow-lg">
          <div class="relative flex flex-1 flex-col space-y-2 px-6 py-8 group">
            <a :href="module.website" target="_blank" rel="noopener" class="absolute inset-0"></a>
            <div class="transition-opacity duration-200 ease-in-out opacity-0 group-hover:opacity-100 text-stone-green absolute top-4 right-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            </div>
            <img :src="iconUrl(module)" :alt="module.name" class="w-10 h-10" />
            <h2 class="flex text-2xl items-center pt-2">
              <span>{{ module.name }}</span>
              <svg v-if="module.type === 'official'" xmlns="http://www.w3.org/2000/svg" class="ml-2 mt-1 h-5 w-5 text-clay-brown" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
            </h2>
            <p class="text-gray-500 group-hover:text-gray-800">{{ module.description }}</p>
          </div>
          <div class="border-t border-gray-200 bg-gray-100 grid grid-cols-3">
            <a :href="npmUrl(module)" target=" _blank" rel="noopener" class="group flex items-center space-x-2 border-r border-gray-200 py-3 px-4 pl-6">
              <svg class="h-8 text-gray-600 group-hover:text-campfire-orange" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <path d="M 0 10 L 0 21 L 9 21 L 9 23 L 16 23 L 16 21 L 32 21 L 32 10 L 0 10 z M 1.7773438 11.777344 L 8.8886719 11.777344 L 8.890625 11.777344 L 8.890625 19.445312 L 7.1113281 19.445312 L 7.1113281 13.556641 L 5.3339844 13.556641 L 5.3339844 19.445312 L 1.7773438 19.445312 L 1.7773438 11.777344 z M 10.667969 11.777344 L 17.777344 11.777344 L 17.779297 11.777344 L 17.779297 19.443359 L 14.222656 19.443359 L 14.222656 21.222656 L 10.667969 21.222656 L 10.667969 11.777344 z M 19.556641 11.777344 L 30.222656 11.777344 L 30.224609 11.777344 L 30.224609 19.445312 L 28.445312 19.445312 L 28.445312 13.556641 L 26.667969 13.556641 L 26.667969 19.445312 L 24.890625 19.445312 L 24.890625 13.556641 L 23.111328 13.556641 L 23.111328 19.445312 L 19.556641 19.445312 L 19.556641 11.777344 z M 14.222656 13.556641 L 14.222656 17.667969 L 16 17.667969 L 16 13.556641 L 14.222656 13.556641 z" fill="currentcolor" />
              </svg>
              <div class="text-sm leading-5 text-gray-600 group-hover:text-gray-900 font-medium">{{ numberFormat(module.downloads) }}</div>
            </a>
            <a :href="module.github" target=" _blank" rel="noopener" class="group flex items-center space-x-1 py-3 px-4 border-r border-gray-200">
              <svg class="w-5 h-5 text-gray-600 group-hover:text-sun-yellow-darkest" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <div class="text-sm leading-5 text-gray-600 group-hover:text-gray-900 font-medium truncate">{{ numberFormat(module.stars) }} <span class="hidden md:inline-block">star{{ module.stars !== 1 ? 's' : '' }}</span></div>
            </a>
            <div class="maintainers-list group flex items-center space-x-1 py-3 px-4 z-0 overflow-hidden">
              <svg class="w-5 h-5 mr-1 text-gray-600 group-hover:text-sky-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <a v-for="maintainer of module.maintainers" :key="maintainer.github" :href="maintainer.github" v-tooltip="{ content: maintainer.github, classes: ['bg-forest-night', 'text-white', 'px-2', 'py-1', 'rounded', 'text-sm'] }" target="_blank" rel="noopener">
                <img class="relative inline-block h-6 w-6 rounded-full text-white shadow-solid transition-opacity duration-200 opacity-75 group-hover:opacity-100" :src="maintainer.avatar" :alt="maintainer.name">
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mx-auto flex justify-center px-4 sm:px-0 pt-12 text-stone-green items-center space-x-2">
      <svg class="h-8" viewBox="0 0 212 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="212" height="44" rx="8" fill="black"/>
        <path d="M60.4375 15.2266V26.5H61.8438V22.4766H64.6797C66.7969 22.4766 68.3047 20.9844 68.3047 18.875C68.3047 16.7266 66.8281 15.2266 64.6953 15.2266H60.4375ZM61.8438 16.4766H64.3281C65.9609 16.4766 66.8594 17.3281 66.8594 18.875C66.8594 20.3672 65.9297 21.2266 64.3281 21.2266H61.8438V16.4766ZM73.3441 26.6484C75.7425 26.6484 77.2269 24.9922 77.2269 22.2891C77.2269 19.5781 75.7425 17.9297 73.3441 17.9297C70.9456 17.9297 69.4613 19.5781 69.4613 22.2891C69.4613 24.9922 70.9456 26.6484 73.3441 26.6484ZM73.3441 25.4375C71.7503 25.4375 70.8519 24.2812 70.8519 22.2891C70.8519 20.2891 71.7503 19.1406 73.3441 19.1406C74.9378 19.1406 75.8363 20.2891 75.8363 22.2891C75.8363 24.2812 74.9378 25.4375 73.3441 25.4375ZM89.2975 18.0781H87.9459L86.2897 24.8125H86.1647L84.2819 18.0781H82.9928L81.11 24.8125H80.985L79.3288 18.0781H77.9694L80.3288 26.5H81.6881L83.5631 19.9844H83.6881L85.5709 26.5H86.9381L89.2975 18.0781ZM93.8213 19.1172C95.1572 19.1172 96.0478 20.1016 96.0791 21.5938H91.4384C91.54 20.1016 92.4775 19.1172 93.8213 19.1172ZM96.04 24.3203C95.6884 25.0625 94.9541 25.4609 93.8681 25.4609C92.4384 25.4609 91.5088 24.4062 91.4384 22.7422V22.6797H97.4931V22.1641C97.4931 19.5469 96.1103 17.9297 93.8369 17.9297C91.5244 17.9297 90.04 19.6484 90.04 22.2969C90.04 24.9609 91.5009 26.6484 93.8369 26.6484C95.6806 26.6484 96.9931 25.7578 97.3838 24.3203H96.04ZM99.2825 26.5H100.626V21.2812C100.626 20.0938 101.556 19.2344 102.837 19.2344C103.103 19.2344 103.587 19.2812 103.697 19.3125V17.9688C103.525 17.9453 103.243 17.9297 103.025 17.9297C101.908 17.9297 100.939 18.5078 100.689 19.3281H100.564V18.0781H99.2825V26.5ZM108.181 19.1172C109.517 19.1172 110.408 20.1016 110.439 21.5938H105.798C105.9 20.1016 106.838 19.1172 108.181 19.1172ZM110.4 24.3203C110.048 25.0625 109.314 25.4609 108.228 25.4609C106.798 25.4609 105.869 24.4062 105.798 22.7422V22.6797H111.853V22.1641C111.853 19.5469 110.47 17.9297 108.197 17.9297C105.884 17.9297 104.4 19.6484 104.4 22.2969C104.4 24.9609 105.861 26.6484 108.197 26.6484C110.041 26.6484 111.353 25.7578 111.744 24.3203H110.4ZM116.76 26.6484C117.924 26.6484 118.924 26.0938 119.455 25.1562H119.58V26.5H120.861V14.7344H119.518V19.4062H119.4C118.924 18.4844 117.932 17.9297 116.76 17.9297C114.619 17.9297 113.221 19.6484 113.221 22.2891C113.221 24.9375 114.603 26.6484 116.76 26.6484ZM117.072 19.1406C118.596 19.1406 119.549 20.3594 119.549 22.2891C119.549 24.2344 118.603 25.4375 117.072 25.4375C115.533 25.4375 114.611 24.2578 114.611 22.2891C114.611 20.3281 115.541 19.1406 117.072 19.1406ZM131.534 26.6484C133.667 26.6484 135.065 24.9219 135.065 22.2891C135.065 19.6406 133.674 17.9297 131.534 17.9297C130.378 17.9297 129.354 18.5 128.893 19.4062H128.768V14.7344H127.424V26.5H128.706V25.1562H128.831C129.362 26.0938 130.362 26.6484 131.534 26.6484ZM131.221 19.1406C132.76 19.1406 133.674 20.3203 133.674 22.2891C133.674 24.2578 132.76 25.4375 131.221 25.4375C129.69 25.4375 128.737 24.2344 128.737 22.2891C128.737 20.3438 129.69 19.1406 131.221 19.1406ZM137.261 29.5469C138.753 29.5469 139.425 28.9688 140.143 27.0156L143.433 18.0781H142.003L139.698 25.0078H139.573L137.261 18.0781H135.808L138.925 26.5078L138.768 27.0078C138.417 28.0234 137.995 28.3906 137.222 28.3906C137.034 28.3906 136.823 28.3828 136.659 28.3516V29.5C136.847 29.5312 137.081 29.5469 137.261 29.5469ZM154.652 26.5L158.55 15.2266H156.402L153.589 24.1484H153.457L150.621 15.2266H148.394L152.332 26.5H154.652ZM162.668 19.3203C163.832 19.3203 164.598 20.1328 164.637 21.3984H160.613C160.699 20.1484 161.512 19.3203 162.668 19.3203ZM164.652 24.1484C164.371 24.7812 163.707 25.1328 162.746 25.1328C161.473 25.1328 160.652 24.2422 160.605 22.8203V22.7188H166.574V22.0938C166.574 19.3984 165.113 17.7812 162.676 17.7812C160.199 17.7812 158.66 19.5078 158.66 22.2578C158.66 25.0078 160.176 26.6719 162.691 26.6719C164.707 26.6719 166.137 25.7031 166.488 24.1484H164.652ZM168.199 26.5H170.137V21.5625C170.137 20.3672 171.012 19.5859 172.27 19.5859C172.598 19.5859 173.113 19.6406 173.262 19.6953V17.8984C173.082 17.8438 172.738 17.8125 172.457 17.8125C171.356 17.8125 170.434 18.4375 170.199 19.2812H170.067V17.9531H168.199V26.5ZM181.7 20.8281C181.497 19.0312 180.168 17.7812 177.973 17.7812C175.403 17.7812 173.895 19.4297 173.895 22.2031C173.895 25.0156 175.411 26.6719 177.981 26.6719C180.145 26.6719 181.489 25.4688 181.7 23.6797H179.856C179.653 24.5703 178.981 25.0469 177.973 25.0469C176.653 25.0469 175.856 24 175.856 22.2031C175.856 20.4297 176.645 19.4062 177.973 19.4062C179.036 19.4062 179.676 20 179.856 20.8281H181.7ZM186.817 19.3203C187.981 19.3203 188.747 20.1328 188.786 21.3984H184.762C184.848 20.1484 185.661 19.3203 186.817 19.3203ZM188.802 24.1484C188.52 24.7812 187.856 25.1328 186.895 25.1328C185.622 25.1328 184.802 24.2422 184.755 22.8203V22.7188H190.723V22.0938C190.723 19.3984 189.262 17.7812 186.825 17.7812C184.348 17.7812 182.809 19.5078 182.809 22.2578C182.809 25.0078 184.325 26.6719 186.841 26.6719C188.856 26.6719 190.286 25.7031 190.637 24.1484H188.802ZM192.427 26.5H194.364V14.6484H192.427V26.5Z" fill="white"/>
        <path d="M23.3248 13L32.6497 29H14L23.3248 13Z" fill="white"/>
        <line x1="43.5" y1="2.18557e-08" x2="43.5" y2="44" stroke="#5E5E5E"/>
      </svg>
      <svg class="h-8" viewBox="0 0 141 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M135.679 0H5.32075C2.38218 0 0 3.58172 0 8V36C0 40.4183 2.38218 44 5.32075 44H135.679C138.618 44 141 40.4183 141 36V8C141 3.58172 138.618 0 135.679 0Z" fill="#003C3C"/>
        <path d="M114.815 17.233L113.925 18.7443L110.882 13.5743L101.541 29.4431H107.865C107.865 30.2778 108.555 30.9544 109.406 30.9544H101.541C100.99 30.9544 100.482 30.6662 100.207 30.1986C99.9315 29.731 99.9315 29.155 100.207 28.6874L109.548 12.8187C109.823 12.3511 110.332 12.063 110.882 12.063C111.433 12.063 111.942 12.3511 112.217 12.8187L114.815 17.233V17.233Z" fill="#00DC82"/>
        <path d="M121.558 28.6874L115.705 18.7442L114.815 17.2329L113.925 18.7442L108.072 28.6874C107.797 29.1549 107.797 29.731 108.072 30.1986C108.347 30.6661 108.856 30.9543 109.406 30.9543H120.222C120.773 30.9543 121.281 30.6665 121.557 30.1988C121.832 29.7312 121.832 29.155 121.557 28.6874H121.558ZM109.406 29.443L114.815 20.2555L120.222 29.443H109.406L109.406 29.443Z" fill="#00DC82"/>
        <path d="M125.743 30.1987C125.468 30.6662 124.96 30.9543 124.409 30.9543H120.222C121.073 30.9543 121.763 30.2777 121.763 29.443H124.406L116.906 16.702L115.705 18.7442L114.815 17.2329L115.572 15.9464C115.848 15.4787 116.356 15.1907 116.907 15.1907C117.457 15.1907 117.966 15.4787 118.241 15.9464L125.743 28.6873C126.018 29.1549 126.018 29.7311 125.743 30.1987V30.1987Z" fill="#00DC82"/>
        <path d="M16.136 30V18.8H18.136L21.928 26.256L25.704 18.8H27.704V30H26.008V21.728L22.584 28.4H21.272L17.832 21.744V30H16.136ZM32.6038 30.192C31.9318 30.192 31.3771 30.08 30.9398 29.856C30.5024 29.632 30.1771 29.3387 29.9638 28.976C29.7504 28.6027 29.6438 28.1973 29.6438 27.76C29.6438 26.992 29.9424 26.384 30.5398 25.936C31.1371 25.488 31.9904 25.264 33.0998 25.264H35.1798V25.12C35.1798 24.5013 35.0091 24.0373 34.6678 23.728C34.3371 23.4187 33.9051 23.264 33.3718 23.264C32.9024 23.264 32.4918 23.3813 32.1398 23.616C31.7984 23.84 31.5904 24.176 31.5158 24.624H29.8198C29.8731 24.048 30.0651 23.5573 30.3958 23.152C30.7371 22.736 31.1638 22.4213 31.6758 22.208C32.1984 21.984 32.7691 21.872 33.3878 21.872C34.4971 21.872 35.3558 22.1653 35.9638 22.752C36.5718 23.328 36.8758 24.1173 36.8758 25.12V30H35.4038L35.2598 28.64C35.0358 29.0773 34.7104 29.4453 34.2838 29.744C33.8571 30.0427 33.2971 30.192 32.6038 30.192ZM32.9398 28.816C33.3984 28.816 33.7824 28.7093 34.0918 28.496C34.4118 28.272 34.6571 27.9787 34.8278 27.616C35.0091 27.2533 35.1211 26.8533 35.1638 26.416H33.2758C32.6038 26.416 32.1238 26.5333 31.8358 26.768C31.5584 27.0027 31.4198 27.296 31.4198 27.648C31.4198 28.0107 31.5531 28.2987 31.8198 28.512C32.0971 28.7147 32.4704 28.816 32.9398 28.816ZM42.4693 30.192C41.7013 30.192 41.0239 30.0107 40.4373 29.648C39.8506 29.2853 39.3919 28.7893 39.0613 28.16C38.7306 27.5307 38.5653 26.816 38.5653 26.016C38.5653 25.216 38.7306 24.5067 39.0613 23.888C39.3919 23.2587 39.8506 22.768 40.4373 22.416C41.0346 22.0533 41.7173 21.872 42.4852 21.872C43.1146 21.872 43.6639 21.9947 44.1333 22.24C44.6133 22.4853 44.9866 22.832 45.2533 23.28V18.48H46.9493V30H45.4293L45.2533 28.768C44.9973 29.1413 44.6453 29.472 44.1973 29.76C43.7493 30.048 43.1733 30.192 42.4693 30.192ZM42.7733 28.72C43.4986 28.72 44.0906 28.4693 44.5493 27.968C45.0186 27.4667 45.2533 26.8213 45.2533 26.032C45.2533 25.232 45.0186 24.5867 44.5493 24.096C44.0906 23.5947 43.4986 23.344 42.7733 23.344C42.0479 23.344 41.4506 23.5947 40.9813 24.096C40.5119 24.5867 40.2773 25.232 40.2773 26.032C40.2773 26.5547 40.3839 27.0187 40.5973 27.424C40.8106 27.8293 41.1039 28.1493 41.4773 28.384C41.8613 28.608 42.2933 28.72 42.7733 28.72ZM52.7996 30.192C52.021 30.192 51.3276 30.0213 50.7196 29.68C50.1223 29.328 49.653 28.8427 49.3116 28.224C48.9703 27.6053 48.7996 26.8853 48.7996 26.064C48.7996 25.232 48.965 24.5013 49.2956 23.872C49.637 23.2427 50.1063 22.752 50.7036 22.4C51.3116 22.048 52.0156 21.872 52.8156 21.872C53.5943 21.872 54.2716 22.048 54.8476 22.4C55.4236 22.7413 55.8716 23.2 56.1916 23.776C56.5116 24.352 56.6716 24.9867 56.6716 25.68C56.6716 25.7867 56.6663 25.904 56.6556 26.032C56.6556 26.1493 56.6503 26.2827 56.6396 26.432H50.4636C50.517 27.2 50.7676 27.7867 51.2156 28.192C51.6743 28.5867 52.2023 28.784 52.7996 28.784C53.2796 28.784 53.6796 28.6773 53.9996 28.464C54.3303 28.24 54.5756 27.9413 54.7356 27.568H56.4316C56.2183 28.3147 55.7916 28.9387 55.1516 29.44C54.5223 29.9413 53.7383 30.192 52.7996 30.192ZM52.7996 23.264C52.2343 23.264 51.733 23.4347 51.2956 23.776C50.8583 24.1067 50.5916 24.608 50.4956 25.28H54.9756C54.9436 24.6613 54.725 24.1707 54.3196 23.808C53.9143 23.4453 53.4076 23.264 52.7996 23.264ZM64.0466 30L61.7106 22.064H63.4066L64.9426 28.048L66.6706 22.064H68.5586L70.2866 28.048L71.8226 22.064H73.5186L71.1826 30H69.4386L67.6146 23.76L65.7906 30H64.0466ZM75.8758 20.56C75.5558 20.56 75.2891 20.464 75.0758 20.272C74.8731 20.0693 74.7718 19.8187 74.7718 19.52C74.7718 19.2213 74.8731 18.976 75.0758 18.784C75.2891 18.5813 75.5558 18.48 75.8758 18.48C76.1958 18.48 76.4571 18.5813 76.6598 18.784C76.8731 18.976 76.9798 19.2213 76.9798 19.52C76.9798 19.8187 76.8731 20.0693 76.6598 20.272C76.4571 20.464 76.1958 20.56 75.8758 20.56ZM75.0278 30V22.064H76.7238V30H75.0278ZM82.2906 30C81.512 30 80.8933 29.8133 80.4346 29.44C79.976 29.056 79.7466 28.3787 79.7466 27.408V23.488H78.3866V22.064H79.7466L79.9546 20.048H81.4426V22.064H83.6826V23.488H81.4426V27.408C81.4426 27.8453 81.5333 28.1493 81.7146 28.32C81.9066 28.48 82.232 28.56 82.6906 28.56H83.6026V30H82.2906ZM85.4314 30V18.48H87.1274V23.344C87.394 22.8853 87.762 22.528 88.2314 22.272C88.7114 22.0053 89.2394 21.872 89.8154 21.872C90.7647 21.872 91.5114 22.1707 92.0554 22.768C92.5994 23.3653 92.8714 24.256 92.8714 25.44V30H91.1914V25.616C91.1914 24.08 90.578 23.312 89.3514 23.312C88.7114 23.312 88.178 23.536 87.7514 23.984C87.3354 24.432 87.1274 25.072 87.1274 25.904V30H85.4314Z" fill="#E6F0F0"/>
      </svg>
    </div>
  </div>
</template>

<script>
import millify from 'millify'
import categories from '~/categories'

export default {
  data() {
    return {
      q: '',
      selectedCategory: null
    }
  },
  async asyncData ({ $content }) {
    const modules = await $content().sortBy('downloads', 'desc').fetch()
    const maintainers = []

    let downloads = 0

    modules.forEach(module => {
      downloads += (module.downloads || 0)
      module.maintainers.forEach(maintainer => {
        if (!maintainers.find(m => m.name === maintainer.name)) {
          maintainers.push(maintainer)
        }
      })
    })

    return {
      modules,
      categories,
      maintainersTotal: maintainers.length,
      downloads
    }
  },
  computed: {
    filteredModules () {
      let modules = this.modules
      if (this.selectedCategory) {
        modules = modules.filter(module => module.category === this.selectedCategory)
      }
      if (!this.q) {
        return modules
      }
      const q = this.q.trim().toLowerCase()
      return modules.filter(module => {
        const search = [module.name, module.npm, module.repo, module.description].concat(module.maintainers.map(m => m.name + ' ' + m.github)).concat(module.categories).join(' ')
        return search.toLowerCase().indexOf(q) !== -1
      })
    },
  },
  methods: {
    numberFormat (num, options = { precision: 1 }) {
      return millify(num || 0, options)
    },
    iconUrl ({ name, icon, category }) {
      if (/^https?:\/\//.test(icon)) {
        return icon
      }
      if (icon) {
        return `/icons/${icon}`
      }
      return `/categories/${category.toLowerCase()}.svg`
    },
    npmUrl ({ npm }) {
      return `https://npmjs.com/package/${npm}`
    },
    toggleCategory (category) {
      if (this.selectedCategory === category) {
        this.selectedCategory = null
        return
      }
      this.selectedCategory = category
    }
  },
  directives: {
    focus: {
      // directive definition
      inserted: function (el) {
        el.focus()
      }
    }
  },
  head () {
    const title = 'Explore Nuxt Modules'
    const description = 'Discover our list of modules to supercharge your Nuxt project. Created by the Nuxt team and community.'
    const url = 'https://modules.nuxtjs.org'

    return {
      title,
      meta: [
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:site_name', property: 'og:site_name', content: title },
        { hid: 'og:description', property: 'og:description', content: description },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:url', property: 'og:url', content: url },
        { hid: 'og:image', property: 'og:image', content: `${url}/preview.png` },
        // Twitter Card
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:site', name: 'twitter:site', content: '@nuxt_js' },
        { hid: 'twitter:title', name: 'twitter:title', content: title },
        { hid: 'twitter:description', name: 'twitter:description', content: description },
        { hid: 'twitter:image', name: 'twitter:image', content: `${url}/preview.png` },
        { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: title }
      ]
    }
  }
}
</script>


<style scoped>
.maintainers-list {
  filter: grayscale(100%);
  &:hover {
    filter: none;
  }
}
</style>
