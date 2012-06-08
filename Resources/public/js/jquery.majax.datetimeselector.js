(function($) {
    $.widget('ui.majaxdatetimeselector', {
        version: '1.0.0',
        eventPrefix: 'majax.datetimeselector',
        options: {
            date_can_be_empty: false,
            time_can_be_empty: false,
            display_date: true,
            display_time: true,
            seconds: false,
            datepicker_opts: {
            }
        },
        _create: function() {
            this.options['id'] = $(this.element).attr('id');
            this._hide_real_ctrls();
            this._build_facade();
            return this;
        },
        _build_facade: function() {
            this.options['controls'] = $('<div id="'+this.options['id']+'"></div>');
            $(this.element).append(this.options['controls']);

            if (this.options['display_date'])
            {
                this.options['date'] = $('<input size="10" type="text" id="'+this.options['id']+'_display" />');
            }
            if (this.options['display_time'])
            {
                this.options['hours'] = $('<select id="'+this.options['id']+'_hours"></select>');
                if (this.options['time_can_be_empty'])
                    this.options['hours'].append('<option value=""></option>');
                for(var i = 1; i < 13; i++)
                    this.options['hours'].append('<option value="'+i+'">'+i+'</option>');

                this.options['minutes'] = $('<select id="'+this.options['id']+'_minutes"></select>');
                if (this.options['time_can_be_empty'])
                    this.options['minutes'].append('<option value=""></option>');
                for(var i = 0; i < 60; i++)
                    this.options['minutes'].append('<option value="'+i+'">'+this._zero_pad(i, 2)+'</option>');

                if (this.options['seconds'])
                {
                    this.options['seconds'] = $('<select id="'+this.options['id']+'_seconds"></select>');
                    if (this.options['time_can_be_empty'])
                        this.options['seconds'].append('<option value=""></option>');
                    for(var i = 0; i < 60; i++)
                        this.options['seconds'].append('<option value="'+i+'">'+this._zero_pad(i, 2)+'</option>');
                }

                this.options['ampm'] = $('<select id="'+this.options['id']+'_ampm"></select>');
                if (this.options['time_can_be_empty'])
                    this.options['ampm'].append('<option value=""></option>');
                this.options['ampm'].append('<option value="am">am</option>');
                this.options['ampm'].append('<option value="pm">pm</option>');
            }


            var tfDisplayUpdate = function(widget) {
                return function() {
                    widget._update_ctrls();
                }
            }

            this._ctrls_to_display();


            if (this.options['display_date'])
            {
                this.options['date'].change(tfDisplayUpdate(this));
                this.options['date'].datepicker(this.options['datepicker_opts']);
                this.options['controls'].append(this.options['date']);
            }

            if (this.options['display_date'] && this.options['display_time'])
                this.options['controls'].append(' ');

            if (this.options['display_time'])
            {
                this.options['hours'].change(tfDisplayUpdate(this));
                this.options['minutes'].change(tfDisplayUpdate(this));
                if (this.options['seconds'])
                    this.options['seconds'].change(tfDisplayUpdate(this));
                this.options['ampm'].change(tfDisplayUpdate(this));

                this.options['controls'].append(this.options['hours']);
                this.options['controls'].append(':');
                this.options['controls'].append(this.options['minutes']);
                if (this.options['seconds'])
                {
                    this.options['controls'].append(':');
                    this.options['controls'].append(this.options['seconds']);
                }
                this.options['controls'].append(' ');
                this.options['controls'].append(this.options['ampm']);
            }

            if (this.options['date_can_be_empty'] || this.options['time_can_be_empty'])
            {
                this.options['controls'].append(' <input type="button" id="'+this.options['id']+'_empty" value="Clear" />');
                $('#'+this.options['id']+'_empty').button();
                var tfClear = function(widget) {
                    return function() {
                        widget._clear_display();
                        return false;
                    }
                }
                $('#'+this.options['id']+'_empty').click(tfClear(this));
            }
        },
        _zero_pad: function(num,count)
        {
            var numZeropad = num + '';
            while(numZeropad.length < count) {
                numZeropad = "0" + numZeropad;
            }
            return numZeropad;
        },
        _ctrls_to_display: function() {
            if (this.options['display_date'])
            {
                var m, d, y;
                m = $('#'+this.options['id']+'_date_month').val();
                d = $('#'+this.options['id']+'_date_day').val();
                y = $('#'+this.options['id']+'_date_year').val();
                if (parseInt(m, 10) > 0 && parseInt(d, 10) > 0 && parseInt(y, 10) > 0)
                {
                    this.options['date'].val(this._zero_pad(m, 2)+'/'+this._zero_pad(d, 2)+'/'+y);
                }
            }

            if (this.options['display_time'])
            {
                var hrs = $('#'+this.options['id']+'_time_hour').val();
                if (hrs != '')
                {
                    hrs = parseInt(hrs, 10);
                    if (hrs < 12)
                        this.options['ampm'].val('am');
                    if (hrs >= 12)
                    {
                        this.options['ampm'].val('pm');
                        if (hrs > 12)
                            hrs = hrs - 12;
                    }
                    if (hrs == 0)
                    {
                        hrs = 12;
                    }
                    this.options['hours'].val(hrs);
                }

                var mins = $('#'+this.options['id']+'_time_minute').val();
                if (mins != '')
                {
                    mins = parseInt(mins, 10);
                    this.options['minutes'].val(mins);
                }

                if (this.options['seconds'] && $('#'+this.options['id']+'_time_second').val() != '')
                {
                    this.options['minutes'].val(parseInt($('#'+this.options['id']+'_time_second').val(), 10));
                }
            }
        },
        _clear_display: function() {
            if (this.options['display_date'] && this.options['date_can_be_empty'])
            {
                $('#'+this.options['id']+'_display').val('');
                $('#'+this.options['id']+'_date_month').val('');
                $('#'+this.options['id']+'_date_day').val('');
                $('#'+this.options['id']+'_date_year').val('');
            }
            if (this.options['display_time'] && this.options['time_can_be_empty'])
            {
                this.options['hours'].val('');
                this.options['minutes'].val('');
                if (this.options['seconds'])
                    this.options['seconds'].val('');
                this.options['ampm'].val('');
            }

            this._update_ctrls();
        },
        _update_ctrls: function() {
            if (this.options['display_date'])
            {
                var val = this.options['date'].val();
                var vals = val.split('/');
                if ((val == '' || vals.length != 3) && this.options['date_can_be_empty'])
                {
                    $('#'+this.options['id']+'_date_month').val('');
                    $('#'+this.options['id']+'_date_day').val('');
                    $('#'+this.options['id']+'_date_year').val('');
                }

                var m, d, y;
                m = vals[0];
                d = vals[1];
                y = vals[2];

                if (parseInt(m, 10) > 0 && parseInt(d, 10) > 0 && parseInt(y, 10) > 0)
                {
                    $('#'+this.options['id']+'_date_month').val(parseInt(m, 10));
                    $('#'+this.options['id']+'_date_day').val(parseInt(d, 10));
                    $('#'+this.options['id']+'_date_year').val(parseInt(y, 10));
                }
            }

            if (this.options['display_time'])
            {
                var ampm = this.options['ampm'].val();

                var hrs, mins, secs;
                if (ampm == 'am')
                    hrs = 0;
                else
                    hrs = 12;
                hrs += parseInt(this.options['hours'].val(), 10);
                if (hrs == 12)
                    hrs = 0;
                if (hrs == 24)
                    hrs = 12;

                mins = parseInt(this.options['minutes'].val(), 10);

                if (this.options['seconds'])
                    secs = parseInt(this.options['seconds'].val(), 10);

                if (this.options['time_can_be_empty'] && this.options['ampm'].val() == '' && this.options['hours'].val() == '')
                {
                    $('#'+this.options['id']+'_time_hour').val('');
                    $('#'+this.options['id']+'_time_minute').val('');
                    if (this.options['seconds'])
                        $('#'+this.options['id']+'_time_second').val('');
                } else {
                    $('#'+this.options['id']+'_time_hour').val(hrs);
                    $('#'+this.options['id']+'_time_minute').val(mins);
                    if (this.options['seconds'])
                        $('#'+this.options['id']+'_time_second').val(secs);
                }
            }
        },
        _hide_real_ctrls: function() {
            if (this.options['display_date'])
                $('#'+this.options['id']+'_date').css('display', 'none');
            if (this.options['display_time'])
                $('#'+this.options['id']+'_time').css('display', 'none');
        },
        _show_real_ctrls: function() {
            if (this.options['display_date'])
                $('#'+this.options['id']+'_date').css('display', null);
            if (this.options['display_time'])
                $('#'+this.options['id']+'_time').css('display', null);
        },
        destroy: function() {
            this._show_real_ctrls();
            $('#'+this.options['id']).detach();
            $.Widget.prototype.destroy.call(this);
            return this;
        }
    });
})(jQuery);