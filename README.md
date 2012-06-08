# Majax Widget Bundle

Providing a nice way to interface with date/time widgets

[Example](https://www.dropbox.com/s/47idu9n1hm4o5s5/Admin%20Edit%20__.jpg)

## Depends on

Needs jquery and jquery UI loaded.

Includes field templates for both regular Symfony2 and Sonata Admin Bundles

## Installation

### deps

    [MajaxWidgetBundle]
        git=http://github.com/jmather/MajaxWidgetBundle.git
        target=/bundles/Majax/WidgetBundle


### Autoloader

    $loader->registerNamespaces(array(
        // ...
        'Majax'         => __DIR__.'/../vendor/bundles',
        // ...
    ));

### AppKernel

    new Majax\UserBundle\MajaxWidgetBundle(),

### Finally

    php app/console assets:install web


## Configuration

Configuration revolves around two parts:

* Adding the javascript include (and configuring it for your use)
* Using the custom templates to add the javascript needed for each field as well

### General Template Configuration

#### Global Configuration

You will have to add the javascript to your template manually

    {% block javascripts %}
    {{ parent() }}
            <script src="{{ asset('bundles/majaxwidget/js/jquery.majax.datetimeselector.js') }}" type="text/javascript"></script>
            <script>$(function() { $.datepicker.setDefaults($.datepicker.regional['']); });</script>
    {% endblock %}

There is probably a better way to do this -- let me know!

#### SonataAdminBundle Configuration

    sonata_admin:
        templates:
            # default global templates
            layout:  MajaxWidgetBundle:Admin:standard_layout.html.twig


### Symfony2 Configuration

    twig:
        form:
            resources:
                - 'MajaxWidgetBundle:Form:fields.html.twig'


### SonataAdminBundle Configuration

    sonata_doctrine_orm_admin:
        templates:
            form:
                - MajaxWidgetBundle:Form:sonata_fields.html.twig
