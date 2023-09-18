<script setup lang="ts">
    import { ref, computed } from 'vue'

    const iconsDefs = ref(null)

    const props = withDefaults(defineProps<{ display:string }>(), { display: 'solid'})

    const disabledIconsDefs = computed (() => (document.querySelectorAll('.rating-svg-icons__defs').length || 0 ) > 0)
</script>

<template>

    <svg class="rating-svg-icon">
        <use :xlink:href="`#${props.display}`"></use>
    </svg>

    <Teleport to="body"  :disabled="disabledIconsDefs">
        <div class="rating-svg-icons__defs" ref="iconsDefs">
            <svg id="sprite-defs" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <defs>
                    <symbol viewBox="0 0 14 13" id="outline">
                        <path fill-rule="evenodd" d="M13.85 4.96a.38.38 0 0 0-.34-.27l-4.18-.3L7.75.32A.38.38 0 0 0 7.4.08a.38.38 0 0 0-.35.25L5.5 4.38l-4.2.3a.38.38 0 0 0-.32.27.4.4 0 0 0 .11.43l3.22 2.8-1.02 4.25a.4.4 0 0 0 .14.41.36.36 0 0 0 .42.02l3.56-2.32 3.56 2.32c.06.04.13.06.2.06a.38.38 0 0 0 .22-.08.4.4 0 0 0 .15-.41L10.5 8.19l3.22-2.81a.4.4 0 0 0 .12-.42Zm-7.82.14-3.8.28 2.92 2.54-.9 3.77L7.4 9.63l3.16 2.06-.9-3.77 2.9-2.54L8.8 5.1 7.4 1.53 6.03 5.1Z" clip-rule="evenodd"/>
                    </symbol>

                    <symbol viewBox="0 0 14 13" id="solid">
                        <path fill-rule="evenodd" d="M13.48 4.96a.38.38 0 0 0-.33-.27l-4.19-.3L7.4.32a.38.38 0 0 0-.35-.25.38.38 0 0 0-.34.25L5.12 4.38l-4.18.3a.38.38 0 0 0-.33.28.4.4 0 0 0 .11.42l3.22 2.8-1.02 4.25a.4.4 0 0 0 .14.41.37.37 0 0 0 .43.02l3.56-2.32 3.55 2.32a.36.36 0 0 0 .42-.02.4.4 0 0 0 .15-.41l-1.02-4.24 3.22-2.81a.4.4 0 0 0 .11-.42Z" clip-rule="evenodd"/>
                    </symbol>
                </defs>
            </svg>
        </div>
    </Teleport>

</template>

<style scoped lang="scss">
    $starSize: 2rem;
    $starColor: #ffb74b;
.rating-svg-icon {

    width: $starSize;
    height: $starSize;
    fill: $starColor;
    position: relative;
    z-index: -1;
}
.rating-svg-icons__defs {
    position: fixed;
    width: 0;
    height: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
}
</style>