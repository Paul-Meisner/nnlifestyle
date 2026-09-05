<script lang="ts">
import Icon from "@iconify/svelte";

import { url } from "@utils/url";


// Submits directly from the browser to Formspree via fetch + FormData, matching
// Formspree's AJAX API (https://help.formspree.io/hc/en-us/articles/360013470814).
// No backend/serverless function in between — Formspree receives and delivers
// the submission on its own.
const FORM_ENDPOINT = "https://formspree.io/f/mdagbjzr";

const REASONS = [
    "Partnership or brand feature",
    "Contributor or guest content",
    "Expert commentary",
    "Reader question or feedback",
    "Something else",
];

const MIN_RESUBMIT_INTERVAL_MS = 15000;

let name = $state("");
let email = $state("");
let company = $state("");
let reason = $state("");
let message = $state("");
let consent = $state(false);
// Honeypot: real visitors never see or fill this field. Formspree also drops
// submissions where `_gotcha` is non-empty, so this is defense in depth.
let gotcha = $state("");

let errors = $state<Record<string, string>>({});
let touched = $state<Record<string, boolean>>({});
let submitting = $state(false);
let submitError = $state("");
let submitted = $state(false);
let lastSubmitAt = 0;

function validate(field: string): string {
    switch (field) {
        case "name":
            return name.trim() ? "" : "Please enter your name.";
        case "email":
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
                ? ""
                : "Enter a valid email address.";
        case "reason":
            return reason ? "" : "Choose what this is about.";
        case "message":
            return message.trim() ? "" : "Add a short message.";
        case "consent":
            return consent ? "" : "Consent is required to send this.";
        default:
            return "";
    }
}

function handleBlur(field: string) {
    touched[field] = true;
    errors[field] = validate(field);
}

function validateAll(): boolean {
    const fields = ["name", "email", "reason", "message", "consent"];
    const nextErrors: Record<string, string> = {};
    for (const field of fields) {
        nextErrors[field] = validate(field);
        touched[field] = true;
    }
    errors = nextErrors;
    const firstInvalid = fields.find((field) => nextErrors[field]);
    if (firstInvalid) {
        document
            .getElementById(`contact-${firstInvalid}`)
            ?.focus({ preventScroll: false });
        return false;
    }
    return true;
}

async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    submitError = "";

    // Bot filled the honeypot — pretend it worked, don't actually send it.
    if (gotcha.trim()) {
        submitted = true;
        return;
    }

    if (!validateAll()) return;

    if (Date.now() - lastSubmitAt < MIN_RESUBMIT_INTERVAL_MS) {
        submitError = "Give it a few seconds and try again.";
        return;
    }

    submitting = true;
    try {
        const reasonLabel = reason || "General inquiry";
        const formData = new FormData();
        formData.set("name", name.trim());
        formData.set("email", email.trim());
        formData.set("company", company.trim());
        formData.set("reason", reasonLabel);
        formData.set("message", message.trim());
        formData.set("_gotcha", gotcha);
        formData.set("_subject", `${reasonLabel} — from ${name.trim()}`);

        const res = await fetch(FORM_ENDPOINT, {
            method: "POST",
            headers: { Accept: "application/json" },
            body: formData,
        });

        if (res.ok) {
            lastSubmitAt = Date.now();
            submitted = true;
        } else {
            const data = await res.json().catch(() => null);
            submitError =
                data?.errors?.map((e: { message: string }) => e.message).join(" ") ||
                "Something went wrong sending that. Try again, or email directly.";
        }
    } catch {
        submitError = "Couldn't reach the server. Check your connection and try again.";
    } finally {
        submitting = false;
    }
}
</script>

{#if submitted}
    <div class="card-base flex items-start gap-3 px-5 py-4" role="status">
        <Icon icon="material-symbols:check-circle-rounded" class="text-[1.5rem] text-[var(--primary)] shrink-0 mt-0.5" />
        <div>
            <p class="font-medium text-black/90 dark:text-white/90">Message sent — thanks.</p>
            <p class="text-sm text-black/60 dark:text-white/60 mt-1">
                Most messages get a reply within two to three business days. A confirmation email is on its way to you now.
            </p>
        </div>
    </div>
{:else}
    <form novalidate onsubmit={handleSubmit} class="flex flex-col gap-4 max-w-lg">
        <!-- Honeypot: hidden from real visitors, left open for bots -->
        <div class="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
            <label for="contact-company-website">Leave this field blank</label>
            <input id="contact-company-website" type="text" name="_gotcha" tabindex="-1" autocomplete="off" bind:value={gotcha} />
        </div>

        <div>
            <label for="contact-name" class="text-sm font-medium text-black/75 dark:text-white/75 mb-1 block">
                Name <span class="text-black/40 dark:text-white/40">(required)</span>
            </label>
            <input
                id="contact-name"
                type="text"
                autocomplete="name"
                bind:value={name}
                onblur={() => handleBlur("name")}
                aria-invalid={touched.name && !!errors.name}
                aria-describedby={errors.name ? "contact-name-error" : undefined}
                class="w-full rounded-lg px-3 py-2 bg-[var(--btn-regular-bg)] border border-[var(--line-color)] text-black/90 dark:text-white/90 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-colors duration-150"
            />
            {#if touched.name && errors.name}
                <p id="contact-name-error" class="text-xs text-red-500 dark:text-red-400 mt-1">{errors.name}</p>
            {/if}
        </div>

        <div>
            <label for="contact-email" class="text-sm font-medium text-black/75 dark:text-white/75 mb-1 block">
                Email <span class="text-black/40 dark:text-white/40">(required)</span>
            </label>
            <input
                id="contact-email"
                type="email"
                autocomplete="email"
                bind:value={email}
                onblur={() => handleBlur("email")}
                aria-invalid={touched.email && !!errors.email}
                aria-describedby={errors.email ? "contact-email-error" : undefined}
                class="w-full rounded-lg px-3 py-2 bg-[var(--btn-regular-bg)] border border-[var(--line-color)] text-black/90 dark:text-white/90 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-colors duration-150"
            />
            {#if touched.email && errors.email}
                <p id="contact-email-error" class="text-xs text-red-500 dark:text-red-400 mt-1">{errors.email}</p>
            {/if}
        </div>

        <div>
            <label for="contact-company" class="text-sm font-medium text-black/75 dark:text-white/75 mb-1 block">
                Company or website <span class="text-black/40 dark:text-white/40">(optional)</span>
            </label>
            <input
                id="contact-company"
                type="text"
                autocomplete="organization"
                bind:value={company}
                class="w-full rounded-lg px-3 py-2 bg-[var(--btn-regular-bg)] border border-[var(--line-color)] text-black/90 dark:text-white/90 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-colors duration-150"
            />
        </div>

        <div>
            <label for="contact-reason" class="text-sm font-medium text-black/75 dark:text-white/75 mb-1 block">
                What's this about? <span class="text-black/40 dark:text-white/40">(required)</span>
            </label>
            <select
                id="contact-reason"
                bind:value={reason}
                onblur={() => handleBlur("reason")}
                aria-invalid={touched.reason && !!errors.reason}
                aria-describedby={errors.reason ? "contact-reason-error" : undefined}
                class="w-full rounded-lg px-3 py-2 bg-[var(--btn-regular-bg)] border border-[var(--line-color)] text-black/90 dark:text-white/90 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-colors duration-150"
            >
                <option value="" disabled selected>Select one</option>
                {#each REASONS as r}
                    <option value={r}>{r}</option>
                {/each}
            </select>
            {#if touched.reason && errors.reason}
                <p id="contact-reason-error" class="text-xs text-red-500 dark:text-red-400 mt-1">{errors.reason}</p>
            {/if}
        </div>

        <div>
            <label for="contact-message" class="text-sm font-medium text-black/75 dark:text-white/75 mb-1 block">
                Message <span class="text-black/40 dark:text-white/40">(required)</span>
            </label>
            <textarea
                id="contact-message"
                rows="5"
                bind:value={message}
                onblur={() => handleBlur("message")}
                aria-invalid={touched.message && !!errors.message}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                class="w-full rounded-lg px-3 py-2 bg-[var(--btn-regular-bg)] border border-[var(--line-color)] text-black/90 dark:text-white/90 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-colors duration-150 resize-vertical"
            ></textarea>
            {#if touched.message && errors.message}
                <p id="contact-message-error" class="text-xs text-red-500 dark:text-red-400 mt-1">{errors.message}</p>
            {/if}
        </div>

        <div>
            <label class="flex items-start gap-2 text-sm text-black/75 dark:text-white/75">
                <input
                    id="contact-consent"
                    type="checkbox"
                    bind:checked={consent}
                    onblur={() => handleBlur("consent")}
                    aria-invalid={touched.consent && !!errors.consent}
                    aria-describedby={errors.consent ? "contact-consent-error" : undefined}
                    class="mt-0.5 accent-[var(--primary)]"
                />
                <span>
                    I'm okay with Now or Never storing this message to respond to it. See the
                    <a href={url("/privacy/")} class="text-[var(--primary)] underline decoration-[var(--link-underline)] decoration-1 decoration-dashed underline-offset-2">privacy policy</a>.
                </span>
            </label>
            {#if touched.consent && errors.consent}
                <p id="contact-consent-error" class="text-xs text-red-500 dark:text-red-400 mt-1">{errors.consent}</p>
            {/if}
        </div>

        {#if submitError}
            <p class="text-sm text-red-500 dark:text-red-400" role="alert">{submitError}</p>
        {/if}

        <button
            type="submit"
            disabled={submitting}
            class="btn-regular rounded-lg px-4 py-2 font-medium disabled:opacity-60 disabled:cursor-not-allowed w-fit"
        >
            {submitting ? "Sending…" : "Send message"}
        </button>
    </form>
{/if}
