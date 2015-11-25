/*
This file is part of Delivery Pipeline Plugin.

Delivery Pipeline Plugin is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Delivery Pipeline Plugin is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Delivery Pipeline Plugin.
If not, see <http://www.gnu.org/licenses/>.
*/
package se.diabol.jenkins.pipeline.domain;

import com.google.common.collect.Lists;

import hudson.matrix.Axis;
import hudson.matrix.AxisList;
import hudson.matrix.MatrixConfiguration;
import hudson.matrix.MatrixProject;

import org.junit.Rule;
import org.junit.Test;
import org.jvnet.hudson.test.Bug;
import org.jvnet.hudson.test.JenkinsRule;
import org.jvnet.hudson.test.WithoutJenkins;

import se.diabol.jenkins.pipeline.PipelineProperty;
import se.diabol.jenkins.pipeline.domain.status.StatusFactory;
import se.diabol.jenkins.pipeline.domain.task.Task;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

public class StageTest {
    @Rule
    public JenkinsRule jenkins = new JenkinsRule();

    @Test
    @WithoutJenkins
    public void testFindStageForJob() {
        Task task1 = new Task(null, "build", "Build", StatusFactory.idle(), null, null, Collections.<String>emptyList(), true, "description");
        List<Stage> stages = Lists.newArrayList(new Stage("QA", Lists.newArrayList(task1)));
        assertNull(Stage.findStageForJob("nofind", stages));
        assertNotNull(Stage.findStageForJob("build", stages));
    }

    @Test
    @Bug(22654)
    public void testStageNameForMultiConfiguration() throws Exception {
        MatrixProject project = jenkins.createMatrixProject("Multi");
        project.setAxes(new AxisList(new Axis("axis", "foo", "bar")));
        project.addProperty(new PipelineProperty("task", "stage", ""));

        Collection<MatrixConfiguration> configurations = project.getActiveConfigurations();

        for (MatrixConfiguration configuration : configurations) {
            List<Stage> stages = Stage.extractStages(configuration, null);
            assertEquals(1, stages.size());
            Stage stage = stages.get(0);
            assertEquals("stage", stage.getName());

        }

    }
}
