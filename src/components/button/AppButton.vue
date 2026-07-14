<template>
    <component
        :is="resolvedTag"
        v-bind="componentAttrs"
        :class="buttonClasses"
        :aria-busy="loading || undefined"
        :disabled="isNativeButton ? isDisabled : undefined"
    >
        <span v-if="loading" class="app-button__spinner" aria-hidden="true">
            <i class="fas fa-spinner fa-spin"></i>
        </span>
        <template v-else>
            <span v-if="icon && iconPosition === 'left'" class="app-button__icon" aria-hidden="true">
                <i :class="icon"></i>
            </span>

            <span class="app-button__content">
                <slot />
            </span>

            <span v-if="icon && iconPosition === 'right'" class="app-button__icon" aria-hidden="true">
                <i :class="icon"></i>
            </span>
        </template>
    </component>
</template>

<script setup>
import { computed, useAttrs } from 'vue'
import { RouterLink } from 'vue-router'

defineOptions({
    name: 'AppButton',
    inheritAttrs: false
})

const props = defineProps({
    type: {
        type: String,
        default: 'button'
    },
    to: {
        type: [String, Object],
        default: null
    },
    href: {
        type: String,
        default: null
    },
    variant: {
        type: String,
        default: ''
    },
    size: {
        type: String,
        default: ''
    },
    loading: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    block: {
        type: Boolean,
        default: false
    },
    icon: {
        type: String,
        default: ''
    },
    iconPosition: {
        type: String,
        default: 'left'
    }
})

const attrs = useAttrs()

const resolvedTag = computed(() => {
    if (props.to) return RouterLink
    if (props.href) return 'a'
    return 'button'
})

const isNativeButton = computed(() => resolvedTag.value === 'button')

const isDisabled = computed(() => props.disabled || props.loading)

const componentAttrs = computed(() => {
    const { class: _class, style: _style, ...rest } = attrs
    if (props.href) {
        return {
            ...rest,
            href: props.href
        }
    }

    if (props.to) {
        return {
            ...rest,
            to: props.to
        }
    }

    return {
        ...rest,
        type: props.type
    }
})

const buttonClasses = computed(() => [
    'btn',
    props.variant ? `btn-${props.variant}` : null,
    props.size ? `btn-${props.size}` : null,
    {
        'app-button--block': props.block,
        'is-loading': props.loading,
        'is-disabled': isDisabled.value
    },
    attrs.class
])
</script>

<style lang="scss" scoped>
.app-button--block {
    width: 100%;
}

.is-loading {
    cursor: progress;
}

.is-disabled {
    pointer-events: none;
}

.app-button__spinner,
.app-button__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.app-button__content {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 0;
}
</style>
