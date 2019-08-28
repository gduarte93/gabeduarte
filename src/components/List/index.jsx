var React = require('react'),
    data  = require('./mockData.json');

require('./List.css');

function List() {
    var title = data && data.title,
        items = data && data.items;

    return(
        <div className="List">
            <div className="List__title">{title}</div>
            <div className="List__list">
                {
                    items && items.map(item => {
                        var title       = item && item.title,
                            proficiency = item && item.proficiency;
                        return (
                            <React.Fragment>
                                <div className="List__item--title">{title}</div>
                                <Proficiency proficiency={proficiency} />
                            </React.Fragment>
                        )
                    })
                }
            </div>
        </div>
    )
}

function Proficiency(props) {
    var proficiency = props && props.proficiency,
        dots = [],
        proficient;

    for (var i = 1; i < 11; i++) {
        proficient = proficiency >= i;

        dots.push(<div className={`List__dot ${proficient ? 'List__dot--active' : ''}`} />)
    }

    return (
        <div className="List__item--proficiency">{dots}</div>
    );
}

module.exports = List;
