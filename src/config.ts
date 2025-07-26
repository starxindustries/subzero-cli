export const CONFIG = {
    // Base template repository
    baseRepo: 'https://github.com/starxindustries/starx-base-skeleton',

    // Module repositories - map module names to their repo URLs
    modules: {
        'auth': 'https://github.com/starxindustries/user-auth-module',
        // Add more modules as needed
    } as Record<string, string>,

    // Directory mappings - where different file types should go
    directoryMapping: {
        'types': 'src/types',
        'components': 'src/components',
        'ui': 'src/ui',
        'utils': 'src/utils',
        'hooks': 'src/hooks',
        'styles': 'src/styles',
        'assets': 'src/assets',
        'config': 'src/config',
        'lib': 'src/lib',
        'pages': 'src/pages',
        'api': 'src/api'
    },

    // Temporary directory for cloning modules
    tempDir: '.subzero-cli-temp'
};