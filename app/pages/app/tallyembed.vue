<script setup lang="ts">
import { ref, onMounted } from 'vue'; 
// Ensure onMounted is imported if you are using it in your actual file

// ... (Your existing 'useSeoMeta' and constant definitions remain here)

// --- Tally Embed Script Logic (Unchanged but included for context) ---
onMounted(() => {
    var d = document, w = "https://tally.so/widgets/embed.js",
        v = function () {
            "undefined" != typeof Tally ? Tally.loadEmbeds() : d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((function(e) {
                e.src = e.dataset.tallySrc;
            }))
        };
    
    if ("undefined" != typeof Tally) {
        v();
    } else if (d.querySelector('script[src="' + w + '"]') == null) {
        var s = d.createElement("script");
        s.src = w, s.onload = v, s.onerror = v, d.body.appendChild(s);
    }
});
// ---------------------------------

// ... (Rest of your component setup logic)
</script>

<template>
  <div>
    <div class="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-blue-300 to-white dark:from-blue-800 dark:to-transparent -z-10"></div>
    
    <div class="my-10 max-w-4xl mx-auto mt-30">
        <iframe data-tally-src="https://tally.so/embed/rjD4jl?transparentBackground=1&dynamicHeight=1" 
                loading="lazy" 
                width="100%" 
                height="276" 
                frameborder="0" 
                marginheight="0" 
                marginwidth="0" 
                title="Contact us">
        </iframe>
    </div>
    
    <SkyBg />
  </div>
</template>