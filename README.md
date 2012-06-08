# Majax Widget Bundle

Providing a nice way to interface with date/time widgets

[Example](https://www.dropbox.com/s/47idu9n1hm4o5s5/Admin%20Edit%20__.jpg)

## Depends on

Needs jquery and jquery UI loaded.

Includes field templates for both regular Symfony2 and Sonata Admin Bundles

## Installation

### Autoloader

    $loader->registerNamespaces(array(
        // ...
        'Majax'         => __DIR__.'/../vendor/bundles',
        // ...
    ));

### AppKernel

    new Majax\UserBundle\MajaxWidgetBundle(),


## Configuration

### Symfony2 Configuration

    twig:
        form:
            resources:
                - 'MajaxWidgetBundle:Form:fields.html.twig'


### SonataAdminBundle Configuration

    sonata_admin:
        templates:
            # default global templates
            layout:  PFFAdBundle:Admin:standard_layout.html.twig
