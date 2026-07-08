/**
 * studioIcons.tsx
 * Re-exports named icon components built around @sanity/icons' Icon + symbol API.
 * Schema .ts files import from here so they don't need JSX themselves.
 */
import { Icon } from '@sanity/icons'

export const TagIcon = () => <Icon symbol="tag" />
export const CogIcon = () => <Icon symbol="cog" />
export const UsersIcon = () => <Icon symbol="users" />
export const EnvelopeIcon = () => <Icon symbol="envelope" />
export const HomeIcon = () => <Icon symbol="home" />
