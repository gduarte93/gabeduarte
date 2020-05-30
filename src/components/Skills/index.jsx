var React     = require('react'),
    CONSTANTS = require('common-constants');

require('./Skills.css');

function renderLogo(length, skill, idx) {
    var logo      = CONSTANTS.LOGO_MAP[skill],
        title     = logo && logo.title,
        Component = logo && logo.component,
        solo      = length === 1;

    if (Component || title) {
        return (
            <div key={idx} className={`Skills__logo ${ solo ? 'Skills__logo--solo' : '' }`}>
                { Component ? <Component className="Skills__logo--icon" /> : null }
                { title ? <div className="Skills__logo--title"><span>{ title }</span></div> : null }
            </div>
        );
    }
}

function renderLogos(_skills) {
    var skills = _skills || [],
        length = skills.length;

    return skills.map(renderLogo.bind(null, length));
}

function Skills(props) {
    var data               = props && props.data,
        
        expert             = data && data.expert,
        expertFrontend     = expert && expert.frontend || [],
        expertBackend      = expert && expert.backend || [],
        expertDatabase     = expert && expert.database || [],
        exFrontendLogos    = renderLogos(expertFrontend),
        exBackendLogos     = renderLogos(expertBackend),
        exDatabaseLogos    = renderLogos(expertDatabase),
        
        proficient         = data && data.proficient,
        proficientFrontend = proficient && proficient.frontend || [],
        proficientBackend  = proficient && proficient.backend || [],
        proficientDatabase = proficient && proficient.database || [],
        proFrontendLogos   = renderLogos(proficientFrontend),
        proBackendLogos    = renderLogos(proficientBackend),
        proDatabaseLogos   = renderLogos(proficientDatabase);

    return(
        <div className="Skills">
            <table className="Skills__table" cellSpacing="0" cellPadding="0">
                <thead>
                    <tr>
                        <th></th>
                        <th>Front End</th>
                        <th>Back End</th>
                        <th>Database</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Expert</td>
                        <td>
                            { exFrontendLogos }
                        </td>
                        <td>
                            { exBackendLogos }
                        </td>
                        <td>
                            { exDatabaseLogos }
                        </td>
                    </tr>
                    <tr>
                        <td>Proficient</td>
                        <td>
                            { proFrontendLogos }
                        </td>
                        <td>
                            { proBackendLogos }
                        </td>
                        <td>
                            { proDatabaseLogos }
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

Skills.displayName = 'Skills';

module.exports = Skills;
